
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CLIENT' | 'ADMIN';
  phone?: string;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  status: 'Recibido' | 'Confirmado' | 'En clasificación' | 'En lavado' | 'En secado' | 'En planchado' | 'Control de calidad' | 'Empacado' | 'Listo para entrega' | 'En reparto' | 'Entregado';
  total: number;
  estimatedDate: string;
  paymentStatus: 'Pendiente' | 'Aprobado' | 'Rechazado';
  paymentMethod?: 'Tarjeta' | 'PSE' | 'Billetera digital' | 'Efectivo';
  items: OrderItem[];
}

export interface OrderItem {
  serviceId: string;
  serviceName: string;
  garment: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Activo' | 'Inactivo';
  ordersCount: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'Empleado' | 'Supervisor' | 'Repartidor' | 'Cajero' | 'Gerente' | 'Soporte' | 'Auxiliar de lavandería';
  status: 'Activo' | 'Inactivo';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  status: 'Activo' | 'Inactivo';
}

export interface Schedule {
  id: string;
  clientId: string;
  type: 'Recogida' | 'Entrega';
  date: string;
  time: string;
  address: string;
}
