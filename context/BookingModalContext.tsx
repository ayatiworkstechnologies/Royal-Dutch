"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingModalContextType {
  isOpen: boolean;
  openModal: (categoryId?: number, serviceId?: string, subServiceId?: number) => void;
  closeModal: () => void;
  initialCategoryId?: number;
  initialServiceId?: string;
  initialSubServiceId?: number;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialCategoryId, setInitialCategoryId] = useState<number | undefined>();
  const [initialServiceId, setInitialServiceId] = useState<string | undefined>();
  const [initialSubServiceId, setInitialSubServiceId] = useState<number | undefined>();

  const openModal = (categoryId?: number, serviceId?: string, subServiceId?: number) => {
    setInitialCategoryId(categoryId);
    setInitialServiceId(serviceId);
    setInitialSubServiceId(subServiceId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Reset initial states after a short delay so the modal closing animation looks smooth
    setTimeout(() => {
      setInitialCategoryId(undefined);
      setInitialServiceId(undefined);
      setInitialSubServiceId(undefined);
    }, 300);
  };

  return (
    <BookingModalContext.Provider value={{ isOpen, openModal, closeModal, initialCategoryId, initialServiceId, initialSubServiceId }}>
      {children}
    </BookingModalContext.Provider>
  );
}

export const useBookingModal = () => {
  const context = useContext(BookingModalContext);
  if (context === undefined) {
    throw new Error('useBookingModal must be used within a BookingModalProvider');
  }
  return context;
};
