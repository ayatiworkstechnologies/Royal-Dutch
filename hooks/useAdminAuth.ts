"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';

// Roles that can access the admin panel at all
export const ADMIN_ROLES = ['super_admin', 'admin', 'receptionist', 'doctor', 'nurse', 'physiotherapist', 'dentist', 'laser_specialist', 'facial_therapist', 'accountant', 'marketing'];

export const CLINICAL_ROLES = ['doctor', 'nurse', 'physiotherapist', 'dentist', 'laser_specialist', 'facial_therapist'];

// Human-readable label for each role shown in the UI
export const ROLE_LABELS: Record<string, string> = {
  super_admin:      'Admin',
  admin:            'Manager',
  receptionist:     'Receptionist',
  doctor:           'Doctor',
  nurse:            'Nurse',
  physiotherapist:  'Physiotherapist',
  dentist:          'Dentist',
  laser_specialist: 'Laser Specialist',
  facial_therapist: 'Facial Therapist',
  accountant:       'Accountant',
  marketing:        'Marketing',
};

const STAFF_DASHBOARD_PATHS = ['/admin/staff-dashboard'];

// Which base paths each restricted role may visit.
// super_admin and admin are unrestricted (no entry here).
export const ROLE_ALLOWED_PATHS: Record<string, string[]> = {
  receptionist: [
    '/admin/dashboard',
    '/admin/bookings',
    '/admin/patients',
    '/admin/billing',
    '/admin/payments',
    '/admin/contacts',
  ],
  doctor:           ['/admin/dashboard', ...STAFF_DASHBOARD_PATHS],
  nurse:            ['/admin/dashboard', ...STAFF_DASHBOARD_PATHS],
  physiotherapist:  ['/admin/dashboard', ...STAFF_DASHBOARD_PATHS],
  dentist:          ['/admin/dashboard', ...STAFF_DASHBOARD_PATHS],
  laser_specialist: ['/admin/dashboard', ...STAFF_DASHBOARD_PATHS],
  facial_therapist: ['/admin/dashboard', ...STAFF_DASHBOARD_PATHS],
  accountant: [
    '/admin/dashboard',
    '/admin/billing',
    '/admin/payments',
    '/admin/patients',
    '/admin/reports',
  ],
  marketing: [
    '/admin/dashboard',
    '/admin/mail',
    '/admin/email-templates',
    '/admin/notifications',
    '/admin/reports',
  ],
};

/**
 * useAdminAuth — protects admin pages.
 *
 * @param allowedRoles  Optional explicit allow-list for a specific page.
 *                      If omitted, falls back to the global ROLE_ALLOWED_PATHS map.
 */
export const useAdminAuth = (allowedRoles?: string[]) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Not logged in → login page
    if (!user) {
      router.push('/');
      return;
    }

    // Not an admin-panel role → login page
    if (!ADMIN_ROLES.includes(user.role)) {
      router.push('/');
      return;
    }

    // Explicit allowedRoles check (used by individual pages)
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.push('/admin/dashboard');
    }
  }, [user, loading, router, allowedRoles?.join(',')]);

  return { user, loading };
};
