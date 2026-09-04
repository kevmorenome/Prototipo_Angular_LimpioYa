
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Service } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private services: Service[] = [
    { id: '1', name: 'Lavado', description: 'Lavado general por prenda', price: 8000, status: 'Activo' },
    { id: '2', name: 'Planchado', description: 'Planchado profesional', price: 5000, status: 'Activo' },
    { id: '3', name: 'Tintorería', description: 'Cuidado especial de prendas', price: 15000, status: 'Activo' },
    { id: '4', name: 'Lavado en seco', description: 'Para prendas delicadas', price: 12000, status: 'Activo' },
    { id: '5', name: 'Servicio especial', description: 'Manchas difíciles y cueros', price: 25000, status: 'Activo' },
  ];
  private servicesSubject = new BehaviorSubject<Service[]>(this.services);
  services$ = this.servicesSubject.asObservable();

  constructor() {
    const local = localStorage.getItem('limpioya_services');
    if (local) {
      this.services = JSON.parse(local);
      this.servicesSubject.next(this.services);
    }
  }
  
  private save() {
      localStorage.setItem('limpioya_services', JSON.stringify(this.services));
      this.servicesSubject.next([...this.services]);
  }

  getServices() { return this.servicesSubject.value; }
  
  updateService(id: string, data: Partial<Service>) {
      const idx = this.services.findIndex(s => s.id === id);
      if(idx > -1) {
          this.services[idx] = {...this.services[idx], ...data};
          this.save();
      }
  }
  
  addService(data: Partial<Service>) {
      const newService = {...data, id: Date.now().toString()} as Service;
      this.services.push(newService);
      this.save();
  }
}
