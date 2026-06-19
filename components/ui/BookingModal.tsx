"use client";

import React, { useState, useEffect } from 'react';
import { useBookingModal } from '@/context/BookingModalContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import api from '@/lib/api';
import { format } from 'date-fns';
import { CheckCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface Service {
  id: string;
  name: string;
}

interface Slot {
  start_time: string;
  end_time: string;
  available: boolean;
}

export function BookingModal() {
  const { isOpen, closeModal, initialCategoryId, initialServiceId } = useBookingModal();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Data
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);

  // Form State
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId || '');
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
      setStep(1);
      setError('');
      setBookingCode('');
      setSelectedCategory(null);
      setSelectedServiceId(initialServiceId || '');
      setSelectedDate('');
      setSelectedSlot('');
      
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
  }, [isOpen, initialServiceId, user]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/categories');
      setCategories(res.data);
      
      // If initial category is set, auto-select it
      if (initialCategoryId) {
        const cat = res.data.find((c: Category) => c.id === initialCategoryId);
        if (cat) {
          handleSelectCategory(cat);
        }
      }
    } catch (err) {
      console.error('Failed to load categories', err);
      setError('Failed to load categories.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = async (category: Category) => {
    setSelectedCategory(category);
    setStep(2);
    setLoading(true);
    try {
      const res = await api.get(`/api/services?category_slug=${category.slug}`);
      setServices(res.data);
    } catch (err) {
      console.error('Failed to load services', err);
      setError('Failed to load services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedServiceId && selectedDate) {
      const fetchSlots = async () => {
        try {
          const res = await api.get(`/api/bookings/slots?service_id=${selectedServiceId}&selected_date=${selectedDate}`);
          const slotStrings = res.data.slots || [];
          setSlots(slotStrings.map((timeStr: string) => ({
            start_time: timeStr,
            end_time: '',
            available: true
          })));
        } catch (err) {
          console.error('Failed to load slots', err);
        }
      };
      fetchSlots();
    } else {
      setSlots([]);
    }
  }, [selectedServiceId, selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        service_id: selectedServiceId,
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

  const renderProgress = () => {
    if (step === 5) return null;
    return (
      <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-6 pt-4">
        {[1, 2, 3, 4].map((s) => (
          <React.Fragment key={s}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${step >= s ? 'bg-[var(--primary-plum)] text-white' : 'bg-gray-200 text-gray-500'}`}>
              {s}
            </div>
            {s < 4 && <div className={`w-8 sm:w-12 h-1 rounded-full transition-colors ${step > s ? 'bg-[var(--primary-plum)]' : 'bg-gray-200'}`}></div>}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={step === 5 ? "" : "Book an Appointment"} maxWidth="2xl">
      {renderProgress()}

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading && step < 5 && (
        <div className="py-12 flex justify-center text-gray-500">Loading...</div>
      )}

      {!loading && step === 1 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 font-cinzel">Select a Speciality</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat)}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[var(--primary-plum)] hover:shadow-md transition-all text-left group bg-white"
              >
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-[var(--primary-plum)] transition-colors">{cat.name}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{cat.description || 'Explore our expert services'}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[var(--primary-plum)] transition-colors" />
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
              <p className="text-xs text-gray-500 uppercase tracking-wider">{selectedCategory?.name}</p>
              <h3 className="text-lg font-semibold text-gray-900 font-cinzel">Select a Service</h3>
            </div>
          </div>
          
          {services.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No services found in this category.</div>
          ) : (
            <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto p-1">
              {services.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedServiceId(s.id); setStep(3); }}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[var(--primary-plum)] hover:bg-[var(--primary-plum)]/5 transition-all text-left group bg-white"
                >
                  <span className="font-medium text-gray-800">{s.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[var(--primary-plum)] transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {!loading && step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="flex items-center mb-4">
            <button onClick={() => setStep(2)} className="mr-3 p-1 rounded-full hover:bg-gray-100 text-gray-500">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{services.find(s => s.id === selectedServiceId)?.name}</p>
              <h3 className="text-lg font-semibold text-gray-900 font-cinzel">Select Date & Time</h3>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
            <input 
              type="date" 
              value={selectedDate}
              min={format(new Date(), 'yyyy-MM-dd')}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedSlot('');
              }}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[var(--primary-plum)] focus:border-[var(--primary-plum)]"
            />
          </div>

          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Available Slots</label>
              {slots.length === 0 ? (
                <p className="text-gray-500 text-sm p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">No slots available for this date. Please select another date.</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[30vh] overflow-y-auto p-1">
                  {slots.map((slot) => (
                    <button
                      key={slot.start_time}
                      disabled={!slot.available}
                      onClick={() => setSelectedSlot(slot.start_time)}
                      className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                        !slot.available ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                        selectedSlot === slot.start_time ? 'bg-[var(--primary-plum)] text-white shadow-md' :
                        'bg-white text-gray-700 border border-gray-200 hover:border-[var(--primary-plum)] hover:text-[var(--primary-plum)]'
                      }`}
                    >
                      {slot.start_time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <Button 
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
            <h3 className="text-lg font-semibold text-gray-900 font-cinzel">Patient Details</h3>
          </div>

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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
            <textarea
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-[var(--primary-plum)] focus:border-[var(--primary-plum)]"
              value={patientDetails.notes}
              onChange={(e) => setPatientDetails({...patientDetails, notes: e.target.value})}
              placeholder="Any specific symptoms or requests?"
            ></textarea>
          </div>

          <div className="pt-4 flex justify-between">
            <Button type="submit" disabled={loading} className="w-full sm:w-auto ml-auto">
              Confirm Booking
            </Button>
          </div>
        </form>
      )}

      {step === 5 && (
        <div className="text-center py-10 animate-in zoom-in duration-500">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-cinzel">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6 text-lg">Your appointment has been successfully scheduled.</p>
          <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-sm mx-auto border border-gray-200">
            <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-semibold">Booking Reference</p>
            <p className="text-2xl font-mono font-bold text-[var(--primary-plum)]">{bookingCode}</p>
          </div>
          <Button onClick={closeModal} variant="outline" className="w-full sm:w-auto">
            Close & Return
          </Button>
        </div>
      )}
    </Modal>
  );
}
