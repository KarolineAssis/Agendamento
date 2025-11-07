
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Appointment } from '../types';

const AppointmentCard: React.FC<{ appointment: Appointment; onDelete: (id: string) => void }> = ({ appointment, onDelete }) => {
  const formattedDate = new Date(`${appointment.date}T00:00:00`).toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: 'long',
  });

  return (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xl font-bold text-pink-700">{appointment.service.name}</p>
          <p className="text-sm text-gray-500">{appointment.clientName}</p>
        </div>
        <div className="text-right">
            <p className="text-lg font-semibold text-gray-800">{appointment.time}</p>
            <p className="text-sm text-gray-600">{formattedDate}</p>
        </div>
      </div>
      <div className="mt-4 border-t pt-4 text-sm text-gray-600 space-y-1">
        <p><strong>Email:</strong> {appointment.clientEmail}</p>
        <p><strong>WhatsApp:</strong> {appointment.clientWhatsApp}</p>
      </div>
      <div className="mt-4 text-right">
        <button onClick={() => onDelete(appointment.id)} className="text-red-500 hover:text-red-700 font-semibold text-sm">
          Cancelar Agendamento
        </button>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const { appointments, deleteAppointment, logout } = useAppContext();

  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Painel de Agendamentos</h2>
        <button
          onClick={logout}
          className="bg-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Sair
        </button>
      </div>
      {sortedAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAppointments.map(app => (
            <AppointmentCard key={app.id} appointment={app} onDelete={deleteAppointment} />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700">Nenhum agendamento encontrado.</h3>
            <p className="text-gray-500 mt-2">A agenda está livre no momento.</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
