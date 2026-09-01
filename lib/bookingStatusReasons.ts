export const BOOKING_STATUS_REASONS: Record<string, string[]> = {
  confirmed: [
    'Doctor available',
    'Patient reconfirmed',
    'Rescheduled and reconfirmed',
  ],
  completed: [
    'Treatment completed',
    'Follow-up scheduled',
    'Patient discharged',
  ],
  cancelled: [
    'Patient request',
    'Doctor unavailable',
    'No response from patient',
    'Duplicate booking',
    'Other',
  ],
  no_show: [
    'Patient did not arrive',
    'Late cancellation',
    'Other',
  ],
  rescheduled: [
    'Patient requested new time',
    'Doctor unavailable',
    'Clinic closure',
    'Other',
  ],
};
