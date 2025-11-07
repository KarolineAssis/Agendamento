
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Appointment } from '../types';
import { ADMIN_PASSWORD } from '../constants';

interface AppContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  deleteAppointment: (appointmentId: string) => void;
  isAdminAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const savedAppointments = localStorage.getItem('appointments');
      return savedAppointments ? JSON.parse(savedAppointments) : [];
    } catch (error) {
      console.error('Error reading appointments from localStorage', error);
      return [];
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
        const savedAuth = sessionStorage.getItem('isAdminAuthenticated');
        return savedAuth ? JSON.parse(savedAuth) : false;
    } catch {
        return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    } catch (error) {
      console.error('Error saving appointments to localStorage', error);
    }
  }, [appointments]);

  useEffect(() => {
    try {
        sessionStorage.setItem('isAdminAuthenticated', JSON.stringify(isAdminAuthenticated));
    } catch (error) {
        console.error('Error saving auth state to sessionStorage', error);
    }
  }, [isAdminAuthenticated]);

  const addAppointment = useCallback((appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: new Date().toISOString(),
    };
    setAppointments(prev => [...prev, newAppointment]);
  }, []);

  const deleteAppointment = useCallback((appointmentId: string) => {
    setAppointments(prev => prev.filter(app => app.id !== appointmentId));
  }, []);

  const login = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdminAuthenticated(false);
  }, []);

  const value = { appointments, addAppointment, deleteAppointment, isAdminAuthenticated, login, logout };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
