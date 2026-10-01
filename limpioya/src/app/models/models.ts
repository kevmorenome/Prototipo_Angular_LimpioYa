export type Role = "cliente" | "admin";
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: Role;
}
export interface Line {
  service: string;
  garment: string;
  quantity: number;
  price: number;
}
export interface Order {
  id: string;
  clientId: number;
  client: string;
  date: string;
  delivery: string;
  status: string;
  total: number;
  paid: boolean;
  paidAt?: string;
  method: string;
  lines: Line[];
}
export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  active: boolean;
}
export interface Employee extends Client {
  role: string;
}
export interface LaundryService {
  id: number;
  name: string;
  description: string;
  price: number;
  active: boolean;
}
export interface Appointment {
  id: number;
  clientId: number;
  type: string;
  date: string;
  time: string;
  address: string;
}
export const STATUSES = [
  "Recibido",
  "Confirmado",
  "En clasificación",
  "En lavado",
  "En secado",
  "En planchado",
  "Control de calidad",
  "Empacado",
  "Listo para entrega",
  "En reparto",
  "Entregado",
];
export const money = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
export const today = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });

export const recentOrders = (a: Order, b: Order) =>
  b.date.localeCompare(a.date) || b.id.localeCompare(a.id);
