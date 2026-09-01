"use client";

import React, { useEffect, useState } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { BOOKING_STATUS_REASONS } from '@/lib/bookingStatusReasons';

interface StatusReasonModalProps {
  isOpen: boolean;
  status: string | null;
  saving?: boolean;
  onCancel: () => void;
  onConfirm: (reason: string, notes: string) => void;
}

const STATUS_LABELS: Record<string, string> = {
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
  no_show: 'No Show',
  rescheduled: 'Rescheduled',
};

export function StatusReasonModal({ isOpen, status, saving, onCancel, onConfirm }: StatusReasonModalProps) {
  const options = status ? BOOKING_STATUS_REASONS[status] ?? [] : [];
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isOpen) {
      setReason(options[0] ?? '');
      setNotes('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, status]);

  if (!isOpen || !status) return null;

  const requiresNote = reason === 'Other';

  const canSubmit = !!reason && (!requiresNote || notes.trim().length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 font-primary">
            Mark as {STATUS_LABELS[status] ?? status}
          </h3>
          <button onClick={onCancel} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Reason</label>
            <select
              title="Reason"
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary-plum)/30"
            >
              {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
              Note {requiresNote ? '(required)' : '(optional)'}
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={requiresNote ? 'Please specify the reason...' : 'Add any extra detail...'}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary-plum)/30 resize-none"
            />
          </div>
        </div>

        <div className="p-5 border-t border-slate-100 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reason, notes)}
            disabled={!canSubmit || saving}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-(--primary-plum) text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving && <RefreshCw className="w-4 h-4 animate-spin" />}
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
