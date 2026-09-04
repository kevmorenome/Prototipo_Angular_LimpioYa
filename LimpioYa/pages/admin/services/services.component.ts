
import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../../services/service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  template: `
    <div class="layout-wrapper">
      <app-sidebar role="ADMIN"></app-sidebar>
      <main class="main-content">
        
        <div class="flex-between">
            <h1>Servicios y Precios</h1>
            <button class="btn btn-primary" (click)="openModal()">+ Nuevo Servicio</button>
        </div>
        
        <div class="card mt-4">
            <table>
                <thead>
                    <tr>
                        <th>Servicio</th>
                        <th>Descripción</th>
                        <th>Precio Base</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let s of services">
                        <td><strong>{{ s.name }}</strong></td>
                        <td>{{ s.description }}</td>
                        <td>
                            <input type="number" class="form-control price-input" [(ngModel)]="s.price" (blur)="updateService(s.id, {price: s.price})">
                        </td>
                        <td>
                            <span class="badge" [ngClass]="s.status === 'Activo' ? 'badge-success' : 'badge-gray'">{{ s.status }}</span>
                        </td>
                        <td>
                            <button class="btn btn-outline btn-sm" (click)="toggleStatus(s)">
                                {{ s.status === 'Activo' ? 'Desactivar' : 'Activar' }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </main>
    </div>
    
    <div class="modal-backdrop" *ngIf="showModal">
        <div class="modal card">
            <h2>Nuevo Servicio</h2>
            <form (ngSubmit)="saveNewService()">
                <div class="form-group">
                    <label>Nombre del servicio</label>
                    <input type="text" class="form-control" [(ngModel)]="newService.name" name="name" required>
                </div>
                <div class="form-group">
                    <label>Descripción</label>
                    <input type="text" class="form-control" [(ngModel)]="newService.description" name="desc" required>
                </div>
                <div class="form-group">
                    <label>Precio Base</label>
                    <input type="number" class="form-control" [(ngModel)]="newService.price" name="price" required>
                </div>
                <div class="modal-actions mt-4">
                    <button type="submit" class="btn btn-primary" [disabled]="!newService.name || !newService.price">Guardar</button>
                    <button type="button" class="btn btn-outline" (click)="showModal = false">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
  `,
  styles: [`
    .flex-between { display: flex; justify-content: space-between; align-items: center; }
    .mt-4 { margin-top: 1.5rem; }
    .price-input { width: 120px; padding: 0.25rem; font-size: 0.9rem; }
    .btn-sm { padding: 0.25rem 0.5rem; font-size: 0.8rem; }
    .modal-backdrop { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal { width: 100%; max-width: 500px; }
    .modal-actions { display: flex; gap: 1rem; }
  `]
})
export class ServicesComponent implements OnInit {
    serviceService = inject(ServiceService);
    
    services: any[] = [];
    showModal = false;
    newService: {name: string, description: string, price: number, status: 'Activo' | 'Inactivo'} = { name: '', description: '', price: 0, status: 'Activo' };
    
    ngOnInit() {
        this.loadServices();
    }
    
    loadServices() {
        this.services = [...this.serviceService.getServices()];
    }
    
    updateService(id: string, data: any) {
        this.serviceService.updateService(id, data);
    }
    
    toggleStatus(s: any) {
        const newStatus = s.status === 'Activo' ? 'Inactivo' : 'Activo';
        this.updateService(s.id, {status: newStatus});
        this.loadServices();
    }
    
    openModal() {
        this.newService = { name: '', description: '', price: 0, status: 'Activo' };
        this.showModal = true;
    }
    
    saveNewService() {
        this.serviceService.addService(this.newService);
        this.loadServices();
        this.showModal = false;
    }
}
