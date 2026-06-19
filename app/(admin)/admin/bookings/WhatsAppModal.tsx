import React, { useState } from 'react';
import api from '@/lib/api';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MessageCircle, Send } from 'lucide-react';

interface Booking {
  id: string;
  patient: {
    id: number;
    full_name: string;
    phone: string;
  };
}

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
}

export function WhatsAppModal({ isOpen, onClose, booking }: WhatsAppModalProps) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;

    setLoading(true);
    setSuccess(false);

    try {
      await api.post('/api/whatsapp/send', {
        recipient_phone: booking.patient.phone,
        message: message,
        booking_id: parseInt(booking.id, 10),
        patient_id: booking.patient.id
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setMessage('');
      }, 2000);
    } catch (error: any) {
      console.error('Failed to send WhatsApp message', error);
      alert(error.response?.data?.detail || 'An error occurred while sending the message');
    } finally {
      setLoading(false);
    }
  };

  // Pre-fill quick templates
  const applyTemplate = (text: string) => {
    setMessage(text);
  };

  if (!booking) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`WhatsApp: ${booking.patient.full_name}`}>
      <div className="space-y-4">
        
        {success ? (
          <div className="bg-emerald-50 text-emerald-700 p-6 rounded-xl text-center border border-emerald-200">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 text-emerald-500" />
            <h3 className="text-lg font-bold">Message Sent Successfully!</h3>
            <p className="text-sm mt-1">The message has been dispatched to {booking.patient.phone}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Recipient</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">{booking.patient.phone}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Quick Templates</label>
              <div className="flex flex-wrap gap-2">
                <button 
                  type="button" 
                  onClick={() => applyTemplate(`Hello ${booking.patient.full_name}, this is a reminder for your upcoming appointment at Royal Dutch Medical Centre.`)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition-colors"
                >
                  Reminder
                </button>
                <button 
                  type="button" 
                  onClick={() => applyTemplate(`Hello ${booking.patient.full_name}, please reply to confirm your appointment at Royal Dutch Medical Centre.`)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition-colors"
                >
                  Request Confirmation
                </button>
                <button 
                  type="button" 
                  onClick={() => applyTemplate(`Hello ${booking.patient.full_name}, your test results are ready. Please contact the clinic.`)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition-colors"
                >
                  Results Ready
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Message Body</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type your WhatsApp message here..."
                className="w-full border-slate-200/50 bg-white/40 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-3 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading || !message} className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2">
                <Send className="w-4 h-4" /> 
                {loading ? 'Sending...' : 'Send WhatsApp'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
