
import React, { useState, useMemo } from 'react';
import { Service } from '../types';
import { SERVICES, PROFESSIONAL_NAME } from '../constants';
import BookingForm from './BookingForm';

const ServiceCard: React.FC<{ service: Service; onSelect: () => void }> = ({ service, onSelect }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
    <div>
      <h3 className="text-xl font-semibold text-pink-800">{service.name}</h3>
      <p className="text-gray-500 mt-1">{service.description || ''}</p>
    </div>
    <div className="mt-4 flex justify-between items-center">
      <p className="text-2xl font-bold text-pink-500">
        R${service.price.toFixed(2).replace('.', ',')}
      </p>
      <button
        onClick={onSelect}
        className="bg-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
      >
        Agendar
      </button>
    </div>
  </div>
);

const ClientView: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const groupedServices = useMemo(() => {
    return SERVICES.reduce((acc, service) => {
      acc[service.category] = acc[service.category] || [];
      acc[service.category].push(service);
      return acc;
    }, {} as Record<string, Service[]>);
  }, []);

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingCancel = () => {
    setSelectedService(null);
  };
  
  const handleBookingSuccess = () => {
    setSelectedService(null);
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      {selectedService ? (
        <BookingForm 
          service={selectedService} 
          professional={PROFESSIONAL_NAME}
          onCancel={handleBookingCancel}
          onSuccess={handleBookingSuccess}
        />
      ) : (
        <>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Nossos Serviços</h2>
            <p className="text-gray-600 mt-2">Escolha um serviço abaixo para iniciar seu agendamento.</p>
          </div>
          <div className="space-y-12">
            {Object.entries(groupedServices).map(([category, services]) => (
              <div key={category}>
                <h3 className="text-3xl font-semibold text-pink-700 mb-6 border-b-2 border-pink-200 pb-2">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map(service => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onSelect={() => handleSelectService(service)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default ClientView;
