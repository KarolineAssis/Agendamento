
export interface Service {
  id: string;
  category: string;
  name: string;
  price: number;
  description?: string;
}

export interface Appointment {
  id: string;
  service: Service;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  clientName: string;
  clientEmail: string;
  clientWhatsApp: string;
}
