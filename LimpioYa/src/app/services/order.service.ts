
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [
    { id: 'PED-2026-0001', clientId: 'C001', clientName: 'Juan Pérez', date: '2026-09-01', status: 'En lavado', total: 45000, estimatedDate: '2026-09-05', paymentStatus: 'Pendiente', items: [{serviceId:'1', serviceName: 'Lavado', garment: 'Camisa', quantity: 3, unitPrice: 15000, subtotal: 45000}] },
    { id: 'PED-2026-0002', clientId: 'C001', clientName: 'Juan Pérez', date: '2026-08-25', status: 'Entregado', total: 25000, estimatedDate: '2026-08-28', paymentStatus: 'Aprobado', paymentMethod: 'Tarjeta', items: [{serviceId:'2', serviceName: 'Planchado', garment: 'Pantalón', quantity: 2, unitPrice: 12500, subtotal: 25000}] },
    { id: 'PED-2026-0003', clientId: 'C002', clientName: 'María Gómez', date: '2026-09-03', status: 'Recibido', total: 60000, estimatedDate: '2026-09-06', paymentStatus: 'Pendiente', items: [] },
    { id: 'PED-2026-0004', clientId: 'C003', clientName: 'Carlos Ruiz', date: '2026-09-02', status: 'Listo para entrega', total: 35000, estimatedDate: '2026-09-04', paymentStatus: 'Aprobado', paymentMethod: 'PSE', items: [] }
  ];
  
  private ordersSubject = new BehaviorSubject<Order[]>(this.orders);
  orders$ = this.ordersSubject.asObservable();

  constructor() {
    const localOrders = localStorage.getItem('limpioya_orders');
    if (localOrders) {
      this.orders = JSON.parse(localOrders);
      this.ordersSubject.next(this.orders);
    }
  }
  
  private save() {
      localStorage.setItem('limpioya_orders', JSON.stringify(this.orders));
      this.ordersSubject.next([...this.orders]);
  }

  getOrders() { return this.ordersSubject.value; }
  
  getOrdersByClient(clientId: string) {
    return this.orders.filter(o => o.clientId === clientId);
  }

  getOrder(id: string) {
    return this.orders.find(o => o.id === id);
  }

  addOrder(order: Partial<Order>) {
    const id = `PED-2026-${(this.orders.length + 1).toString().padStart(4, '0')}`;
    const newOrder = { ...order, id, date: new Date().toISOString().split('T')[0] } as Order;
    this.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }

  updateOrderStatus(id: string, status: any) {
    const index = this.orders.findIndex(o => o.id === id);
    if (index !== -1) {
      this.orders[index].status = status;
      this.save();
    }
  }
  
  updatePayment(id: string, status: any, method: any) {
      const index = this.orders.findIndex(o => o.id === id);
      if(index !== -1) {
          this.orders[index].paymentStatus = status;
          this.orders[index].paymentMethod = method;
          this.save();
      }
  }
}
