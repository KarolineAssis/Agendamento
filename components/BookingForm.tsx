
import React, { useState, useEffect, useMemo } from 'react';
import { Service, Appointment } from '../types';
import { AVAILABLE_TIMES } from '../constants';
import { useAppContext } from '../hooks/useAppContext';
import ConfirmationModal from './ConfirmationModal';

interface BookingFormProps {
  service: Service;
  professional: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ service, professional, onCancel, onSuccess }) => {
  const { appointments, addAppointment } = useAppContext();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientWhatsApp, setClientWhatsApp] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const availableTimesForSelectedDate = useMemo(() => {
    if (!date) return [];
    const bookedTimes = appointments
      .filter(app => app.date === date)
      .map(app => app.time);
    return AVAILABLE_TIMES.filter(t => !bookedTimes.includes(t));
  }, [date, appointments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !clientName || !clientEmail || !clientWhatsApp) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    const newAppointmentData = {
      service,
      date,
      time,
      clientName,
      clientEmail,
      clientWhatsApp,
    };
    addAppointment(newAppointmentData);
    setBookedAppointment({ ...newAppointmentData, id: 'temp-id' });
    setShowConfirmation(true);
  };
  
  const handleCloseModal = () => {
      setShowConfirmation(false);
      onSuccess();
  }

  return (
    <>
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-pink-800 mb-2">Agendar Serviço</h2>
        <p className="text-gray-600 mb-6">Você está agendando: <span className="font-semibold text-pink-600">{service.name}</span></p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="professional" className="block text-sm font-medium text-gray-700">Profissional</label>
            <input
              id="professional"
              type="text"
              readOnly
              value={professional}
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data</label>
              <input
                id="date"
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  setDate(e.target.value)
                  setTime('')
                }}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
            </div>
            <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Horário</label>
                <select 
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                >
                    <option value="" disabled>Selecione um horário</option>
                    {availableTimesForSelectedDate.length > 0 ? (
                        availableTimesForSelectedDate.map(t => <option key={t} value={t}>{t}</option>)
                    ) : (
                        <option disabled>Nenhum horário disponível</option>
                    )}
                </select>
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Seu Nome</label>
            <input
              id="name"
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              placeholder="Seu nome completo"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Seu E-mail</label>
            <input
              id="email"
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              placeholder="seuemail@exemplo.com"
            />
          </div>
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">Seu WhatsApp</label>
            <input
              id="whatsapp"
              type="tel"
              value={clientWhatsApp}
              onChange={(e) => setClientWhatsApp(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              placeholder="(XX) XXXXX-XXXX"
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
             <button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!time}
              className="bg-pink-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-600 transition-colors disabled:bg-pink-300 disabled:cursor-not-allowed"
            >
              Confirmar Agendamento
            </button>
          </div>
        </form>
      </div>
      {showConfirmation && bookedAppointment && (
        <ConfirmationModal
          appointment={bookedAppointment}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default BookingForm;
