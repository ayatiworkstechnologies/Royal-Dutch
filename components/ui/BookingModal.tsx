"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useBookingModal } from '@/context/BookingModalContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import api from '@/lib/api';
import { format, addDays } from 'date-fns';
import { CheckCircle, ChevronRight, ArrowLeft, RefreshCw, CalendarDays, Clock3, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

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
  duration_minutes: number | null;
}


export function BookingModal() {
  const { isOpen, closeModal, initialCategoryId, initialServiceId } = useBookingModal();
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
  const [upgradesLoading, setUpgradesLoading] = useState(false);
  const [upgradesError, setUpgradesError] = useState(false);
  const [upgradesRetry, setUpgradesRetry] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

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
  }, [isOpen, initialCategoryId, initialServiceId, directBooking, user]);

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
      const res = await api.get(`/api/bookings/slots/week?service_id=${serviceId}&start_date=${startIso}&days=31`);
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
  const totalPrice = selectedService?.price == null || selectedUpgrades.some(item => item.price == null)
    ? null
    : (Math.round(Number(selectedService.price) * 100) + selectedUpgrades.reduce((sum, item) => sum + Math.round(Number(item.price) * 100), 0)) / 100;
  const formatPrice = (price: number | string | null, currency: string) => price == null
    ? 'Price on request'
    : `${currency} ${Number(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  useEffect(() => {
    let cancelled = false;
    setSubServices([]);
    setSelectedSubServiceIds([]);
    setUpgradesError(false);
    setUpgradesLoading(Boolean(isOpen && selectedServiceId));
    if (isOpen && selectedServiceId) {
      api.get(`/api/services/${selectedServiceId}/sub-services`)
        .then(res => { if (!cancelled) setSubServices(res.data); })
        .catch(() => { if (!cancelled) setUpgradesError(true); })
        .finally(() => { if (!cancelled) setUpgradesLoading(false); });
    }
    return () => { cancelled = true; };
  }, [isOpen, selectedServiceId, upgradesRetry]);
  const showSummary = (step === 3 || step === 4) && Boolean(selectedService) && !loading;

  const renderProgress = () => {
    if (step === 5) return null;
    return (
      <div className="flex justify-center items-center space-x-1.5 sm:space-x-2.5 mb-7 pt-4">
        {bookingSteps.map((s) => (
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
              {step > s ? <CheckCircle className="w-4 h-4" /> : s}
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

      <div className={showSummary ? "grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr] lg:gap-8" : ""}>
      <div className="min-w-0">
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
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span className="font-bold text-(--primary-plum)">{formatPrice(s.price, s.currency)}</span>
                      {s.duration_minutes != null && (
                        <span className="text-gray-400">· {s.duration_minutes} mins</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0 text-gray-300 group-hover:text-(--primary-plum) group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {!loading && step === 3 && selectedServiceId && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
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

          {/* Scrollable 30-day date strip */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <CalendarDays className="w-3.5 h-3.5 text-(--primary-plum)/60" />
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {format(new Date(), 'MMMM yyyy')} <span className="text-gray-300 mx-1">·</span> Next 30 days
              </p>
            </div>
            {slotsError && (
              <div className="mb-3 text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                Could not load availability — you can still select a date to check.
              </div>
            )}
            <div className="relative">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-72 overflow-y-auto pr-1 pb-1 pt-3 [scrollbar-width:thin]">
                {Array.from({ length: 31 }).map((_, i) => {
                  const d = addDays(new Date(), i);
                  const iso = format(d, 'yyyy-MM-dd');
                  const loaded = weekSlots !== null && !slotsLoading;
                  const dayData = weekSlots?.[iso];
                  const freeCount = loaded ? (dayData?.free || []).length : null;
                  const hasSlots = freeCount !== null && freeCount > 0;
                  const isSelected = selectedDate === iso;
                  const isToday = i === 0;

                  return (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => { setSelectedDate(iso); setSelectedSlot(''); }}
                      className={[
                        'relative flex flex-col items-center py-4 px-3 rounded-2xl border text-xs font-medium transition-all duration-200',
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
                      <span className={`text-[10px] uppercase font-semibold tracking-wide ${isSelected ? 'text-white/75' : 'text-gray-400'}`}>
                        {format(d, 'EEEE')}
                      </span>
                      <span className="text-2xl font-bold leading-tight mt-1">{format(d, 'd')}</span>
                      <span className={`text-[10px] font-medium ${isSelected ? 'text-white/60' : 'text-gray-400'}`}>
                        {format(d, 'MMM')}
                      </span>
                      <span className={`mt-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold ${
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
              {/* bottom fade hint */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent" />
            </div>
          </div>

          {/* Time slots for selected day */}
          {selectedDate ? (
            <div className="rounded-2xl border border-(--primary-plum)/10 bg-(--primary-plum)/[0.03] p-4">
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
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
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
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-50 overflow-y-auto pr-1">
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
            <div className="flex flex-col items-center gap-2 py-8 text-gray-400 text-sm rounded-2xl border border-dashed border-gray-200">
              <CalendarDays className="w-6 h-6 text-gray-300" />
              Pick a date above to see available times
            </div>
          )}

          {/* Desktop only: keep Continue button under the date/time section */}
          <div className="hidden pt-1 lg:flex lg:justify-end">
            <Button
              type="button"
              onClick={() => setStep(4)}
              disabled={!selectedDate || !selectedSlot}
            >
              Continue to Details
            </Button>
          </div>
        </div>
      )}

      {!loading && step === 4 && (
        <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="flex items-center mb-4">
            <button type="button" onClick={() => setStep(3)} className="mr-3 p-1 rounded-full hover:bg-gray-100 text-gray-500">
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

          <div className="pt-1 flex justify-between">
            <Button type="submit" disabled={loading} className="w-full sm:w-auto ml-auto">
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
        <aside aria-label="Booking summary" className="self-start overflow-hidden rounded-2xl border border-[#eadfe8] bg-[#faf6fa] shadow-sm lg:sticky lg:top-0">
          <div className="bg-gradient-to-br from-(--primary-plum) to-(--primary-plum-dark) px-5 py-4">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/60">
              <Sparkles className="w-3 h-3 text-(--primary-gold)" />
              Booking Summary
            </div>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-white/50">{selectedCategory?.name}</p>
            <p className="mt-1 text-lg font-semibold text-white font-cinzel">{selectedService.name}</p>
          </div>

          <div className="p-5">
            <fieldset className="space-y-2.5">
              <legend className="px-0 text-sm font-semibold text-gray-900">Booking Upgrades</legend>
              <p className="-mt-1 text-xs text-gray-500">Add optional subservices to your appointment.</p>
              {upgradesLoading && <p className="text-sm text-gray-500" role="status">Loading upgrades...</p>}
              {upgradesError && <p className="text-sm text-red-700" role="alert">Unable to load upgrades. <button type="button" className="underline" onClick={() => setUpgradesRetry(value => value + 1)}>Retry</button></p>}
              {!upgradesLoading && !upgradesError && subServices.length === 0 && <p className="text-xs text-gray-500">No upgrades available for this service.</p>}
              {subServices.map(item => {
                const checked = selectedSubServiceIds.includes(item.id);
                const unavailable = item.currency !== selectedService.currency;
                return (
                  <label key={item.id} className={`flex items-start gap-3 rounded-xl border p-3 transition-all ${unavailable ? 'opacity-50' : 'cursor-pointer hover:shadow-sm'} ${checked ? 'border-(--primary-plum) bg-white shadow-sm ring-1 ring-(--primary-plum)/10' : 'border-[#eadfe8] bg-white/60'}`}>
                    <input type="checkbox" checked={checked} disabled={unavailable} className="mt-1 h-4 w-4 shrink-0 accent-(--primary-plum)" onChange={event => setSelectedSubServiceIds(ids => event.target.checked ? [...ids, item.id] : ids.filter(id => id !== item.id))} />
                    <span className="min-w-0 text-sm"><span className="block font-medium text-gray-900">{item.name}</span><span className="mt-0.5 block text-xs font-semibold text-(--primary-plum-light)">{item.price != null ? '+ ' : ''}{formatPrice(item.price, item.currency)}</span>{unavailable && <span className="block text-xs">Unavailable in this booking currency</span>}</span>
                  </label>
                );
              })}
            </fieldset>

            <dl className="mt-5 space-y-3 text-sm border-t border-dashed border-[#dcc9d5] pt-4">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Service price</dt>
                <dd className="text-right font-semibold text-gray-900">
                  {selectedService.price != null
                    ? `${selectedService.currency} ${Number(selectedService.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : 'Price on request'}
                </dd>
              </div>
              {/* Duration hidden for now
              {selectedService.duration_minutes != null && (
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Duration</dt>
                  <dd className="font-medium text-gray-900">{selectedService.duration_minutes} minutes</dd>
                </div>
              )}
              */}
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Date</dt>
                <dd className="text-right font-medium text-gray-900">{selectedDate ? format(new Date(`${selectedDate}T00:00:00`), 'dd MMM yyyy') : 'Not selected'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Time</dt>
                <dd className="font-medium text-gray-900">{selectedSlot || 'Not selected'}</dd>
              </div>
            </dl>

            <div aria-live="polite" aria-atomic="true" className="mt-5 rounded-xl bg-white border border-(--primary-gold)/30 px-4 py-3">
              <div className="flex justify-between items-center gap-3">
                <span className="text-sm font-semibold text-gray-800">Total</span>
                <span className="text-right text-lg font-bold text-(--primary-plum)">{formatPrice(totalPrice, selectedService.currency)}</span>
              </div>
              {selectedUpgrades.length > 0 && <p className="mt-1.5 text-xs text-gray-500">Includes {selectedUpgrades.length} selected upgrade{selectedUpgrades.length === 1 ? '' : 's'}.</p>}
              {totalPrice == null && <p className="mt-1.5 text-xs text-gray-500">The clinic will confirm the final price.</p>}
            </div>
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
