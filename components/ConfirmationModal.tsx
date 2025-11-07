
import React from 'react';
import { Appointment } from '../types';

interface ConfirmationModalProps {
  appointment: Appointment;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ appointment, onClose }) => {
  const { clientName, clientEmail, clientWhatsApp, service, date, time } = appointment;
  
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const emailBody = `Olá ${clientName}, seu agendamento para ${service.name} foi confirmado para ${formattedDate} às ${time}. Aguardamos você! Atenciosamente, Karoline Assis.`;
  const whatsappMessage = `Olá ${clientName}, seu agendamento para *${service.name}* foi confirmado para *${formattedDate} às ${time}*. Aguardamos você! Atenciosamente, Karoline Assis.`;

  const mailtoLink = `mailto:${clientEmail}?subject=Confirmação de Agendamento - Karoline Assis&body=${encodeURIComponent(emailBody)}`;
  const whatsappLink = `https://api.whatsapp.com/send?phone=${clientWhatsApp.replace(/\D/g, '')}&text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full text-center transform transition-all scale-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-pink-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Agendamento Confirmado!</h2>
        <p className="text-gray-600 mb-6">
          <strong>{clientName}</strong>, seu horário para <strong>{service.name}</strong> foi agendado com sucesso.
        </p>
        <div className="bg-pink-50 p-4 rounded-lg text-left mb-6">
          <p className="font-semibold text-pink-800">Detalhes:</p>
          <ul className="text-gray-700 space-y-1 mt-2">
            <li><strong>Data:</strong> {formattedDate}</li>
            <li><strong>Horário:</strong> {time}</li>
            <li><strong>Serviço:</strong> {service.name}</li>
          </ul>
        </div>
        <p className="text-sm text-gray-500 mb-4">Enviaremos uma confirmação para seu e-mail e WhatsApp.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <a href={mailtoLink} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors w-full">
                Enviar Confirmação por E-mail
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors w-full">
                Enviar no WhatsApp
            </a>
        </div>
        <button
          onClick={onClose}
          className="bg-pink-500 text-white font-bold py-2 px-8 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
