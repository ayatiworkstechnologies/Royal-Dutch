"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useBookingModal } from '@/context/BookingModalContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import api from '@/lib/api';
import { format, addDays } from 'date-fns';
import { CheckCircle, ChevronLeft, ChevronRight, ArrowLeft, RefreshCw, CalendarDays, Clock3, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { formatPriceValue, getPriceBounds } from '@/lib/priceRange';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface Service {
  id: number;
  name: string;
  price: number | string | null;
  currency: string;
}

interface ServicePackage {
  id: number;
  sub_service_id: number;
  name: string;
  sessions: number | null;
  price: number | string | null;
  currency: string;
}

const APPOINTMENT_WINDOW_DAYS = 31;
const DATE_PAGE_SIZE = 4;

export function BookingModal() {
  const { isOpen, closeModal, initialCategoryId, initialServiceId, initialSubServiceId } = useBookingModal();
  const { user } = useAuth();

  const directBooking = initialCategoryId != null && Boolean(initialServiceId);
  const bookingSteps = directBooking ? [3, 4] : [1, 2, 3, 4];

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Data
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  // week slots: date_iso -> {free, taken} | null (null = not yet loaded)
  const [weekSlots, setWeekSlots] = useState<Record<string, { free: string[]; taken: string[] }> | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(false);

  // Form State
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [subServices, setSubServices] = useState<Service[]>([]);
  const [selectedSubServiceIds, setSelectedSubServiceIds] = useState<number[]>([]);
  const [selectedPackageIds, setSelectedPackageIds] = useState<number[]>([]);
  const [upgradesLoading, setUpgradesLoading] = useState(false);
  const [upgradesError, setUpgradesError] = useState(false);
  const [upgradesRetry, setUpgradesRetry] = useState(0);
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [datePageStart, setDatePageStart] = useState(0);

  const [patientDetails, setPatientDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [bookingCode, setBookingCode] = useState('');

  // Reset internal state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(directBooking ? 3 : 1);
      setError('');
      setBookingCode('');
      setSelectedCategory(null);
      setSelectedServiceId('');
      setSelectedDate('');
      setSelectedSlot('');
      setDatePageStart(0);
      setWeekSlots(null);
      setSlotsError(false);
      
      if (user) {
        setPatientDetails({
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          email: user.email || '',
          phone: '',
          notes: ''
        });
      }
      
      fetchCategories();
    }
  }, [isOpen, initialCategoryId, initialServiceId, initialSubServiceId, directBooking, user]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/categories');
      setCategories(res.data);
      
      // If initial category is set, auto-select it
      if (initialCategoryId) {
        const cat = res.data.find((c: Category) => c.id === initialCategoryId);
        if (cat) {
          await handleSelectCategory(cat, initialServiceId);
        } else {
          setError('This category is no longer available for booking.');
        }
      }
    } catch (err) {
      console.error('Failed to load categories', err);
      setError('Failed to load categories.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = async (category: Category, preselectedServiceId?: string) => {
    setSelectedServiceId('');
    setSelectedDate('');
    setSelectedSlot('');
    setServices([]);
    setError('');
    setSelectedCategory(category);
    setStep(preselectedServiceId ? 3 : 2);
    setLoading(true);
    try {
      const res = await api.get(`/api/services?category_slug=${category.slug}`);
      setServices(res.data);
      if (preselectedServiceId) {
        const service = (res.data as Service[]).find(item => String(item.id) === preselectedServiceId);
        if (service) {
          setSelectedServiceId(String(service.id));
          setStep(3);
        } else {
          setError('This service is no longer available. Please select another service.');
        }
      }
    } catch (err) {
      console.error('Failed to load services', err);
      setError('Failed to load services.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthSlots = useCallback(async (serviceId: string) => {
    if (!serviceId) return;
    setSlotsLoading(true);
    setSlotsError(false);
    setWeekSlots(null);
    try {
      const startIso = format(new Date(), 'yyyy-MM-dd');
      const res = await api.get(`/api/bookings/slots/week?service_id=${serviceId}&start_date=${startIso}&days=${APPOINTMENT_WINDOW_DAYS}`);
      setWeekSlots(res.data && typeof res.data === 'object' ? res.data : {});
    } catch (err) {
      console.error('Failed to load slots', err);
      setSlotsError(true);
      setWeekSlots({});
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  // Start fetching as soon as a service is selected (step 2 → 3 will be instant)
  useEffect(() => {
    if (selectedServiceId) {
      fetchMonthSlots(selectedServiceId);
    } else {
      setWeekSlots(null);
      setSlotsError(false);
    }
  }, [selectedServiceId, fetchMonthSlots]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        service_id: Number(selectedServiceId),
        sub_service_ids: selectedSubServiceIds,
        package_ids: selectedPackageIds,
        booking_date: selectedDate,
        booking_time: selectedSlot,
        patient: { 
          full_name: `${patientDetails.first_name} ${patientDetails.last_name}`.trim(),
          email: patientDetails.email,
          phone: patientDetails.phone,
        },
        notes: patientDetails.notes
      };
      const res = await api.post('/api/bookings', payload);
      setBookingCode(res.data.booking_code || res.data.id);
      setStep(5);
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      const errorMsg = typeof detail === 'string' 
        ? detail 
        : Array.isArray(detail) 
          ? detail.map((d: any) => `${d.loc?.[1] || d.loc?.[0] || 'field'}: ${d.msg}`).join(', ') 
          : 'Failed to submit booking. Please try again.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const selectedService = services.find(service => String(service.id) === selectedServiceId);
  const selectedUpgrades = subServices.filter(item => selectedSubServiceIds.includes(item.id));
  const selectedPackages = packages.filter(item => selectedPackageIds.includes(item.id));
  const selectedExtras = [...selectedUpgrades, ...selectedPackages];
  const directSubServiceBooking = initialSubServiceId != null;
  const visibleSubServices = directSubServiceBooking
    ? subServices.filter(item => item.id === initialSubServiceId)
    : subServices;
  const selectedPrices = [...selectedUpgrades, ...selectedPackages].length === 0 || [...selectedUpgrades, ...selectedPackages].some(item => item.price == null)
    ? null
    : [...selectedUpgrades.map(item => item.price as number | string), ...selectedPackages.map(item => item.price as number | string)];
  const totalPrice = (() => {
    if (!selectedPrices) return null;
    let minimum = 0;
    let maximum = 0;
    for (const price of selectedPrices) {
      const bounds = getPriceBounds(price);
      if (!bounds) return null;
      minimum += bounds[0];
      maximum += bounds[1];
    }
    return [minimum, maximum] as const;
  })();
  const formatPrice = (price: number | string | null, currency: string) => price == null
    ? 'Price on request'
    : `${currency} ${formatPriceValue(price)}`;

  useEffect(() => {
    let cancelled = false;
    setSubServices([]);
    setSelectedSubServiceIds([]);
    setSelectedPackageIds([]);
    setUpgradesError(false);
    setUpgradesLoading(Boolean(isOpen && selectedServiceId));
    if (isOpen && selectedServiceId) {
      api.get(`/api/services/${selectedServiceId}/sub-services`)
        .then(res => {
          if (!cancelled) {
            setSubServices(res.data);
            setSelectedSubServiceIds(
              initialSubServiceId != null && res.data.some((item: Service) => item.id === initialSubServiceId)
                ? [initialSubServiceId]
                : [],
            );
          }
        })
        .catch(() => { if (!cancelled) setUpgradesError(true); })
        .finally(() => { if (!cancelled) setUpgradesLoading(false); });
    }
    return () => { cancelled = true; };
  }, [isOpen, selectedServiceId, initialSubServiceId, upgradesRetry]);

  // Retain a package after its parent treatment is unticked, allowing a
  // customer to book the package on its own.
  useEffect(() => {
    let cancelled = false;
    const packageParentIds = Array.from(new Set([
      ...selectedSubServiceIds,
      ...(initialSubServiceId != null ? [initialSubServiceId] : []),
      ...packages.filter(item => selectedPackageIds.includes(item.id)).map(item => item.sub_service_id),
    ]));
    if (!isOpen || packageParentIds.length === 0) {
      const resetTimer = window.setTimeout(() => {
        if (!cancelled) {
          setPackages([]);
          setPackagesLoading(false);
        }
      }, 0);
      return () => { cancelled = true; window.clearTimeout(resetTimer); };
    }
    Promise.resolve()
      .then(() => {
        if (!cancelled) setPackagesLoading(true);
        return Promise.all(packageParentIds.map(subServiceId =>
          api.get<ServicePackage[]>(`/api/sub-services/${subServiceId}/packages`).then(response => response.data),
        ));
      })
      .then(results => { if (!cancelled) setPackages(results.flat()); })
      .catch(() => { if (!cancelled) setPackages([]); })
      .finally(() => { if (!cancelled) setPackagesLoading(false); });
    return () => { cancelled = true; };
  }, [isOpen, selectedSubServiceIds, selectedPackageIds, initialSubServiceId]);

  const showSummary = (step === 3 || step === 4) && Boolean(selectedService) && !loading;

  const renderProgress = () => {
    if (step === 5) return null;
    return (
      <div className="flex justify-center items-center space-x-1.5 sm:space-x-2.5 mb-7 pt-4">
        {bookingSteps.map((s, index) => (
          <React.Fragment key={s}>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all duration-300 ${
                step > s
                  ? 'bg-(--primary-plum) text-white shadow-[0_0_0_3px_rgba(122,43,104,0.15)]'
                  : step === s
                    ? 'bg-(--primary-plum) text-white shadow-[0_0_0_4px_rgba(194,166,97,0.25)] scale-110'
                    : 'bg-gray-100 text-gray-400'
              }`}
            >
              {step > s ? <CheckCircle className="w-4 h-4" /> : directBooking ? index + 1 : s}
            </div>
            {s < 4 && (
              <div className="relative w-8 sm:w-14 h-[3px] rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-(--primary-plum) to-(--primary-plum-light) transition-all duration-500"
                  style={{ width: step > s ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={step === 5 ? "" : "Book an Appointment"} maxWidth={showSummary ? "5xl" : "2xl"}>
      {renderProgress()}

      {step === 4 && (
        <div className="mb-4 lg:hidden">
          <button type="button" onClick={() => setStep(3)} className="inline-flex items-center gap-2 text-sm font-semibold text-(--primary-plum) transition hover:text-(--primary-plum-dark)">
            <ArrowLeft className="h-4 w-4" />
            Back to date and time
          </button>
        </div>
      )}

      <div className={showSummary ? `grid grid-cols-1 gap-6 lg:gap-8 ${step === 4 ? 'lg:grid-cols-2' : 'lg:grid-cols-[minmax(280px,3fr)_minmax(0,7fr)]'}` : ""}>
      <div className={step === 4 ? "order-2 min-w-0 lg:order-1" : "min-w-0"}>
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading && step < 5 && (
        <div className="py-12 flex justify-center text-gray-500">Loading...</div>
      )}

      {!loading && step === 1 && (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-(--primary-gold-dark)">Step 1</p>
            <h3 className="text-xl font-semibold text-gray-900 font-cinzel">Select a Speciality</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat)}
                className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-(--primary-plum)/40 hover:shadow-lg hover:shadow-(--primary-plum)/10"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-(--primary-plum-light) to-(--primary-plum) text-base font-bold text-white shadow-sm">
                  {cat.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-(--primary-plum) transition-colors">{cat.name}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{cat.description || 'Explore our expert services'}</p>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 mt-1.5 text-gray-300 group-hover:text-(--primary-plum) group-hover:translate-x-0.5 transition-all" />
                <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-(--primary-gold)/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}

      {!loading && step === 2 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="flex items-center mb-4">
            <button onClick={() => setStep(1)} className="mr-3 p-1 rounded-full hover:bg-gray-100 text-gray-500">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-(--primary-gold-dark)">{selectedCategory?.name}</p>
              <h3 className="text-xl font-semibold text-gray-900 font-cinzel">Select a Service</h3>
            </div>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No services found in this category.</div>
          ) : (
            <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto p-1">
              {services.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedServiceId(String(s.id)); setStep(3); }}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-(--primary-plum)/40 hover:shadow-md hover:shadow-(--primary-plum)/10"
                >
                  <div className="min-w-0">
                    <span className="block font-semibold text-gray-800 group-hover:text-(--primary-plum) transition-colors">{s.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0 text-gray-300 group-hover:text-(--primary-plum) group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {!loading && step === 3 && selectedServiceId && (
        <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          {/* Header */}
          <div className="flex items-center">
            {!directBooking && (
              <button type="button" onClick={() => setStep(2)} className="mr-3 p-1 rounded-full hover:bg-gray-100 text-gray-500">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-(--primary-gold-dark)">{services.find(s => String(s.id) === selectedServiceId)?.name}</p>
              <h3 className="text-xl font-semibold text-gray-900 font-cinzel">Select Date & Time</h3>
            </div>
            {slotsLoading && <RefreshCw className="w-4 h-4 animate-spin text-(--primary-plum)/50" />}
          </div>

          {/* Four-date availability navigator */}
          <div>
            {(() => {
              const availabilityDates = Array.from(
                { length: APPOINTMENT_WINDOW_DAYS },
                (_, index) => addDays(new Date(), index),
              );
              const monthOptions = availabilityDates.filter((date, index, dates) =>
                index === 0 || format(date, 'yyyy-MM') !== format(dates[index - 1], 'yyyy-MM'),
              );
              const visibleDates = availabilityDates.slice(datePageStart, datePageStart + DATE_PAGE_SIZE);
              const canGoBack = datePageStart > 0;
              const canGoForward = datePageStart + DATE_PAGE_SIZE < availabilityDates.length;

              return <>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-(--primary-plum)/70" />
                    <label className="sr-only" htmlFor="booking-month">Choose an appointment month</label>
                    <select
                      id="booking-month"
                      value={format(availabilityDates[datePageStart], 'yyyy-MM')}
                      onChange={(event) => {
                        const firstDateIndex = availabilityDates.findIndex(
                          (date) => format(date, 'yyyy-MM') === event.target.value,
                        );
                        if (firstDateIndex >= 0) setDatePageStart(Math.floor(firstDateIndex / DATE_PAGE_SIZE) * DATE_PAGE_SIZE);
                      }}
                      className="cursor-pointer rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-700 outline-none transition focus:border-(--primary-plum) focus:ring-2 focus:ring-(--primary-plum)/15"
                    >
                      {monthOptions.map((date) => <option key={format(date, 'yyyy-MM')} value={format(date, 'yyyy-MM')}>{format(date, 'MMMM yyyy')}</option>)}
                    </select>
                    <span className="text-xs font-medium text-gray-400">Next 30 days</span>
                  </div>
                  <div className="flex items-center gap-1" aria-label="Browse appointment dates">
                    <button type="button" aria-label="Show previous dates" disabled={!canGoBack} onClick={() => setDatePageStart((current) => Math.max(0, current - DATE_PAGE_SIZE))} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-(--primary-plum)/50 hover:text-(--primary-plum) disabled:cursor-not-allowed disabled:opacity-35">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button type="button" aria-label="Show next dates" disabled={!canGoForward} onClick={() => setDatePageStart((current) => Math.min(availabilityDates.length - DATE_PAGE_SIZE, current + DATE_PAGE_SIZE))} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-(--primary-plum)/50 hover:text-(--primary-plum) disabled:cursor-not-allowed disabled:opacity-35">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
            {slotsError && (
              <div className="mb-3 text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                Could not load availability — you can still select a date to check.
              </div>
            )}
            <div>
              <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-2 sm:gap-4">
                {visibleDates.map((d) => {
                  const iso = format(d, 'yyyy-MM-dd');
                  const loaded = weekSlots !== null && !slotsLoading;
                  const dayData = weekSlots?.[iso];
                  const freeCount = loaded ? (dayData?.free || []).length : null;
                  const hasSlots = freeCount !== null && freeCount > 0;
                  const isSelected = selectedDate === iso;
                  const isToday = iso === format(new Date(), 'yyyy-MM-dd');

                  return (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => { setSelectedDate(iso); setSelectedSlot(''); }}
                      className={[
                        'relative flex flex-col items-center rounded-xl border px-1 py-2.5 text-xs font-medium transition-all duration-200 sm:rounded-2xl sm:px-3 sm:py-4',
                        isSelected
                          ? 'bg-gradient-to-b from-(--primary-plum-light) to-(--primary-plum) text-white border-(--primary-plum) shadow-lg shadow-(--primary-plum)/25 scale-[1.03]'
                          : slotsLoading || weekSlots === null
                            ? 'bg-gray-50 border-gray-100 text-gray-300 animate-pulse cursor-wait'
                            : hasSlots
                              ? 'bg-white border-gray-200 text-gray-700 hover:border-(--primary-plum)/50 hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
                              : 'bg-gray-50/60 border-gray-100 text-gray-400 hover:border-gray-200 cursor-pointer',
                      ].join(' ')}
                    >
                      {isSelected && (
                        <CheckCircle className="absolute right-2 top-2 h-3.5 w-3.5 text-(--primary-gold)" />
                      )}
                      {isToday && !isSelected && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-(--primary-gold) px-2 py-[2px] text-[8px] font-bold uppercase tracking-wide text-white shadow-sm">
                          Today
                        </span>
                      )}
                      <span className={`text-[9px] uppercase font-semibold tracking-wide sm:text-[10px] ${isSelected ? 'text-white/75' : 'text-gray-400'}`}>
                        {format(d, 'EEEE')}
                      </span>
                      <span className="mt-1 text-lg font-bold leading-tight sm:text-2xl">{format(d, 'd')}</span>
                      <span className={`text-[9px] font-medium sm:text-[10px] ${isSelected ? 'text-white/60' : 'text-gray-400'}`}>
                        {format(d, 'MMM')}
                      </span>
                      <span className={`mt-1 rounded-full px-1.5 py-0.5 text-[8px] font-bold sm:mt-1.5 sm:px-2 sm:text-[9px] ${
                        isSelected
                          ? 'bg-white/15 text-(--primary-gold)'
                          : hasSlots
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        {slotsLoading || weekSlots === null ? '···' : hasSlots ? `${freeCount} free` : 'Full'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
              </>;
            })()}
          </div>

          {/* Time slots for selected day */}
          {selectedDate ? (
            <div className="rounded-2xl border border-(--primary-plum)/10 bg-(--primary-plum)/[0.03] p-3 sm:p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <Clock3 className="w-3.5 h-3.5 text-(--primary-plum)/60" />
                <p className="text-sm font-semibold text-gray-800">
                  {format(new Date(selectedDate + 'T00:00:00'), 'EEEE, MMMM d')}
                </p>
                {weekSlots !== null && !slotsLoading && (
                  <span className="text-xs font-medium text-emerald-600">
                    · {(weekSlots[selectedDate]?.free || []).length} available
                  </span>
                )}
              </div>
              {slotsLoading || weekSlots === null ? (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="h-10 rounded-xl bg-gray-100 animate-pulse" />
                  ))}
                </div>
              ) : (() => {
                const free  = weekSlots[selectedDate]?.free  || [];
                const taken = weekSlots[selectedDate]?.taken || [];
                const all   = [...free, ...taken].sort();
                return all.length === 0 ? (
                  <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-400 text-sm">No slots available for this date — please pick another day</p>
                  </div>
                ) : (
                  <div className="grid max-h-44 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:max-h-50 sm:grid-cols-5">
                    {all.map((time) => {
                      const isTaken    = taken.includes(time);
                      const isSelected = selectedSlot === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={isTaken}
                          onClick={() => !isTaken && setSelectedSlot(time)}
                          title={isTaken ? 'This slot is already booked' : undefined}
                          className={`py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 text-center border ${
                            isTaken
                              ? 'bg-gray-50 border-gray-100 text-gray-300 line-through cursor-not-allowed'
                              : isSelected
                                ? 'bg-(--primary-plum) text-white border-(--primary-plum) shadow-md shadow-(--primary-plum)/25 scale-105'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-(--primary-plum) hover:text-(--primary-plum) hover:shadow-sm hover:-translate-y-0.5'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-gray-200 py-6 text-sm text-gray-400 sm:py-8">
              <CalendarDays className="w-6 h-6 text-gray-300" />
              Pick a date above to see available times
            </div>
          )}

        </div>
      )}

      {!loading && step === 4 && (
        <form id="booking-patient-details" onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="flex items-center mb-4">
            <button type="button" onClick={() => setStep(3)} className="mr-3 hidden rounded-full p-1 text-gray-500 hover:bg-gray-100 lg:block">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-(--primary-gold-dark)">Almost there</p>
              <h3 className="text-xl font-semibold text-gray-900 font-cinzel">Patient Details</h3>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="First Name"
                required
                value={patientDetails.first_name}
                onChange={(e) => setPatientDetails({...patientDetails, first_name: e.target.value})}
              />
              <Input
                label="Last Name"
                required
                value={patientDetails.last_name}
                onChange={(e) => setPatientDetails({...patientDetails, last_name: e.target.value})}
              />
              <Input
                label="Email Address"
                type="email"
                required
                value={patientDetails.email}
                onChange={(e) => setPatientDetails({...patientDetails, email: e.target.value})}
              />
              <Input
                label="Phone Number"
                type="tel"
                required
                value={patientDetails.phone}
                onChange={(e) => setPatientDetails({...patientDetails, phone: e.target.value})}
              />
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-2.5 shadow-sm outline-none backdrop-blur-sm transition-all duration-200 focus:border-(--primary-plum) focus:bg-white focus:ring-4 focus:ring-(--primary-plum)/10 sm:text-sm"
                value={patientDetails.notes}
                onChange={(e) => setPatientDetails({...patientDetails, notes: e.target.value})}
                placeholder="Any specific symptoms or requests?"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-1 lg:hidden">
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              Confirm Booking
            </Button>
          </div>

        </form>
      )}

      {step === 5 && (
        <div className="text-center py-6 animate-in zoom-in duration-500">
          <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-40" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/30">
              <CheckCircle className="w-11 h-11 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-cinzel">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-7 text-base">Your appointment has been successfully scheduled.<br />A confirmation has been sent to your email.</p>
          <div className="relative mx-auto mb-8 max-w-sm overflow-hidden rounded-2xl border border-(--primary-plum)/15 bg-gradient-to-br from-(--primary-plum)/[0.04] to-(--primary-gold)/[0.06]">
            <div className="flex items-center justify-center gap-1.5 pt-4 text-[10px] font-bold uppercase tracking-widest text-(--primary-gold-dark)">
              <Sparkles className="w-3 h-3" />
              Booking Reference
            </div>
            <p className="px-6 pb-5 pt-2 text-3xl font-mono font-bold tracking-wider text-(--primary-plum)">{bookingCode}</p>
          </div>
          <Button onClick={closeModal} variant="outline" className="w-full sm:w-auto">
            Close & Return
          </Button>
        </div>
      )}
      </div>
      {showSummary && selectedService && (
        <aside aria-label="Booking summary" className={`${step === 4 ? 'order-1 lg:order-2' : ''} self-start overflow-hidden rounded-2xl border border-[#eadfe8] bg-[#fcf9fc] shadow-[0_12px_32px_rgba(94,29,80,0.08)] lg:sticky lg:top-0`}>
          <div className={step === 4 ? "border-b border-[#eadfe8] bg-white px-5 py-4" : "bg-gradient-to-r from-(--primary-plum) to-(--primary-plum-dark) px-6 py-5"}>
            <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${step === 4 ? 'text-(--primary-plum)' : 'text-white/60'}`}>
              <Sparkles className={`w-3 h-3 ${step === 4 ? 'text-(--primary-gold-dark)' : 'text-(--primary-gold)'}`} />
              Booking Summary
            </div>
            {step !== 4 && <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-white/55">{selectedCategory?.name}</p>}
            <p className={`mt-1 text-xl font-semibold leading-tight font-cinzel ${step === 4 ? 'text-gray-900' : 'text-white'}`}>{selectedService.name}</p>
          </div>

          <div className="space-y-5 p-6">
            {step === 3 ? <fieldset>
              <legend className="sr-only">{directSubServiceBooking ? 'Selected Treatment' : 'Booking upgrades'}</legend>
              {upgradesLoading && <p className="text-sm text-gray-500" role="status">Loading upgrades...</p>}
              {upgradesError && <p className="text-sm text-red-700" role="alert">Unable to load upgrades. <button type="button" className="underline" onClick={() => setUpgradesRetry(value => value + 1)}>Retry</button></p>}
              {!upgradesLoading && !upgradesError && subServices.length === 0 && <p className="text-xs text-gray-500">No upgrades available for this service.</p>}
              <div className="grid gap-3 sm:grid-cols-2">
              {visibleSubServices.map(item => {
                const checked = selectedSubServiceIds.includes(item.id);
                const unavailable = item.currency !== selectedService.currency;
                const childPackages = packages.filter(packageItem => packageItem.sub_service_id === item.id);
                return (
                  <div key={item.id} className={`rounded-xl border p-3 transition-all ${unavailable ? 'opacity-50' : 'hover:shadow-sm'} ${checked ? 'border-(--primary-plum) bg-white shadow-sm ring-1 ring-(--primary-plum)/10' : 'border-[#eadfe8] bg-white/60'}`}>
                    <label className={`flex items-start gap-3 ${unavailable ? '' : 'cursor-pointer'}`}>
                      <input type="checkbox" checked={checked} disabled={unavailable} className="mt-1 h-4 w-4 shrink-0 accent-(--primary-plum)" onChange={event => {
                        setSelectedSubServiceIds(ids => event.target.checked ? [...ids, item.id] : ids.filter(id => id !== item.id));
                      }} />
                      <span className="min-w-0 text-sm"><span className="block font-medium text-gray-900">{item.name}</span><span className="mt-0.5 block text-xs font-semibold text-(--primary-plum-light)">{item.price != null ? '+ ' : ''}{formatPrice(item.price, item.currency)}</span>{unavailable && <span className="block text-xs">Unavailable in this booking currency</span>}</span>
                    </label>
                    {(checked || directSubServiceBooking || childPackages.some(packageItem => selectedPackageIds.includes(packageItem.id))) && (packagesLoading || childPackages.length > 0) && (
                      <div className="mt-3 border-t border-dashed border-[#dcc9d5] pt-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Packages for {item.name}</p>
                        {packagesLoading ? <p className="mt-1 text-xs text-gray-500">Loading packages...</p> : (
                          <div className="mt-2 space-y-2">
                            {childPackages.map(packageItem => {
                              const packageChecked = selectedPackageIds.includes(packageItem.id);
                              return <label key={packageItem.id} className={`flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2.5 transition-colors ${packageChecked ? 'border-(--primary-gold) bg-(--primary-gold)/10' : 'border-(--primary-gold)/30 bg-white'}`}>
                                <input type="checkbox" checked={packageChecked} className="mt-0.5 h-4 w-4 shrink-0 accent-(--primary-plum)" onChange={event => setSelectedPackageIds(ids => event.target.checked ? [...ids, packageItem.id] : ids.filter(id => id !== packageItem.id))} />
                                <span className="min-w-0 flex-1 text-sm"><span className="block font-medium text-gray-900">{packageItem.name}</span>{packageItem.sessions != null && <span className="mt-0.5 block text-xs text-gray-500">{packageItem.sessions} session{packageItem.sessions === 1 ? '' : 's'}</span>}</span>
                                <span className="shrink-0 text-sm font-semibold text-(--primary-plum)">+ {formatPrice(packageItem.price, packageItem.currency)}</span>
                              </label>;
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              </div>
            </fieldset> : (
              <div>
                {selectedExtras.length > 0 ? (
                  <div className="overflow-hidden rounded-xl border border-[#eadfe8] bg-white">
                    {selectedExtras.map(item => (
                      <div key={`${item.id}-${item.name}`} className="flex items-start justify-between gap-3 border-b border-[#f0e6ee] px-3.5 py-3 last:border-b-0">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="shrink-0 text-sm font-semibold text-(--primary-plum)">+ {formatPrice(item.price, item.currency)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-[#eadfe8] bg-white/70 px-3.5 py-3 text-sm text-gray-500">No upgrades selected.</p>
                )}
              </div>
            )}

            <dl className="grid gap-3 sm:grid-cols-2">
              <div className="border-l-2 border-(--primary-gold) bg-(--primary-gold)/[0.07] py-2 pl-3 pr-2">
                <dt className="flex items-center gap-1.5 text-xs font-medium text-gray-500"><CalendarDays className="h-3.5 w-3.5 text-(--primary-plum)" />Appointment date</dt>
                <dd className="mt-1 text-base font-semibold text-gray-900">{selectedDate ? format(new Date(`${selectedDate}T00:00:00`), 'dd MMM yyyy') : 'Not selected'}</dd>
              </div>
              <div className="border-l-2 border-(--primary-plum) bg-(--primary-plum)/[0.05] py-2 pl-3 pr-2">
                <dt className="flex items-center gap-1.5 text-xs font-medium text-gray-500"><Clock3 className="h-3.5 w-3.5 text-(--primary-plum)" />Appointment time</dt>
                <dd className="mt-1 text-base font-semibold text-gray-900">{selectedSlot || 'Not selected'}</dd>
              </div>
            </dl>

            {step === 3 && <div aria-live="polite" className="rounded-xl border border-[#eadfe8] bg-white px-4 py-3.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Selected treatments</p>
              {selectedExtras.length > 0 ? (
                <div className="mt-2 space-y-1.5">
                  {selectedExtras.map(item => (
                    <div key={`summary-${item.id}-${item.name}`} className="flex items-start justify-between gap-4 text-sm">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="shrink-0 font-semibold text-(--primary-plum)">+ {formatPrice(item.price, item.currency)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-500">No upgrades selected.</p>
              )}
            </div>}

            <div aria-live="polite" aria-atomic="true" className="rounded-xl border border-(--primary-gold)/35 bg-(--primary-gold)/[0.08] px-5 py-4">
              <div className="flex justify-between items-center gap-3">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-right text-xl font-bold text-(--primary-plum)">{formatPrice(totalPrice == null ? null : totalPrice[0] === totalPrice[1] ? totalPrice[0] : `${totalPrice[0]}-${totalPrice[1]}`, selectedService.currency)}</span>
              </div>
              {(selectedUpgrades.length + selectedPackages.length) > 0 && <p className="mt-1.5 text-xs text-gray-500">Includes {selectedUpgrades.length} sub-service{selectedUpgrades.length === 1 ? '' : 's'} and {selectedPackages.length} package{selectedPackages.length === 1 ? '' : 's'}.</p>}
              {totalPrice == null && <p className="mt-1.5 text-xs text-gray-500">The clinic will confirm the final price.</p>}
            </div>

            {step === 4 && (
              <div className="hidden lg:block">
                <Button type="submit" form="booking-patient-details" disabled={loading} className="w-full">
                  Confirm Booking
                </Button>
              </div>
            )}

            {step === 3 && <div className="hidden lg:block">
              <Button
                type="button"
                onClick={() => setStep(4)}
                disabled={!selectedDate || !selectedSlot}
                className="w-full"
              >
                Continue to Details
              </Button>
              {!selectedDate || !selectedSlot ? (
                <p className="mt-2 text-center text-xs text-gray-500">Choose a date and time to continue.</p>
              ) : null}
            </div>}
          </div>
        </aside>
      )}

      {/* Mobile + tablet only: Continue button comes AFTER Booking Summary */}
      {!loading && step === 3 && selectedServiceId && (
        <div className="flex justify-end lg:hidden">
          <Button
            type="button"
            onClick={() => setStep(4)}
            disabled={!selectedDate || !selectedSlot}
            className="w-full sm:w-auto"
          >
            Continue to Details
          </Button>
        </div>
      )}
      </div>
    </Modal>
  );
}
