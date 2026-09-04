
import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  template: `
    <div class="layout-wrapper">
      <app-sidebar role="ADMIN"></app-sidebar>
      <main class="main-content">
        <div class="top-header">
            <div>
                <h1 style="margin-bottom: 0.25rem">Gestión de Clientes</h1>
                <p class="text-muted" style="margin:0">Administra los usuarios registrados en el sistema.</p>
            </div>
            <div class="user-menu">
                <button class="btn btn-primary" (click)="showModal = true">
                    <span class="material-symbols-rounded" style="font-size: 1.2rem">person_add</span>
                    Nuevo Cliente
                </button>
            </div>
        </div>
        
        <div class="card p-0 mt-4">
            <div class="table-responsive" style="border: none;">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Pedidos Realizados</th>
                            <th>Estado</th>
                            <th class="text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let client of clients">
                            <td><div style="font-weight: 600; color: var(--text-main)">{{ client.name }}</div></td>
                            <td class="text-muted">{{ client.email }}</td>
                            <td>{{ client.phone }}</td>
                            <td><span style="font-weight: 600">{{ client.orders }}</span> pedidos</td>
                            <td><span class="badge" [ngClass]="client.status === 'Activo' ? 'badge-success' : 'badge-gray'">{{ client.status }}</span></td>
                            <td class="text-right"><button class="btn btn-secondary btn-sm">Ver info</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </main>
    </div>
    
    <!-- Modal Nuevo Cliente -->
    <div class="modal-backdrop" *ngIf="showModal">
        <div class="modal card" style="max-width: 500px; width: 100%">
            <div class="flex-between mb-4">
                <h2 style="font-size: 1.25rem; margin:0">Registrar Nuevo Cliente</h2>
                <button class="btn btn-secondary btn-sm" (click)="showModal = false" style="padding: 0.25rem; border: none; box-shadow: none">
                    <span class="material-symbols-rounded">close</span>
                </button>
            </div>
            
            <div class="alert alert-success mb-4" *ngIf="successMsg" style="background: var(--success-bg); color: var(--success-text); padding: 1rem; border-radius: var(--radius-md)">
                Cliente registrado correctamente (Simulación).
            </div>
            
            <form (ngSubmit)="saveClient()" *ngIf="!successMsg">
                <div class="form-group">
                    <label>Nombre Completo</label>
                    <input type="text" class="form-control" required placeholder="Ej. Carlos Mendoza">
                </div>
                <div class="form-group">
                    <label>Correo Electrónico</label>
                    <input type="email" class="form-control" required placeholder="carlos@ejemplo.com">
                </div>
                <div class="form-group">
                    <label>Teléfono</label>
                    <input type="text" class="form-control" placeholder="300 123 4567">
                </div>
                
                <div class="flex-between mt-4">
                    <button type="button" class="btn btn-secondary" (click)="showModal = false">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Registrar Cliente</button>
                </div>
            </form>
        </div>
    </div>
  `,
  styles: [`
    .p-0 { padding: 0 !important; }
    .modal-backdrop { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(2px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 1rem; }
    .modal { animation: fadeInSlideUp 0.3s ease-out forwards; }
  `]
})
export class ClientsComponent {
    showModal = false;
    successMsg = false;
    
    clients = [
        { name: 'Juan Pérez', email: 'cliente@limpioya.com', phone: '3001234567', orders: 5, status: 'Activo' },
        { name: 'María Gómez', email: 'maria@ejemplo.com', phone: '3109876543', orders: 2, status: 'Activo' },
        { name: 'Carlos Ruiz', email: 'carlos@ejemplo.com', phone: '3201112233', orders: 10, status: 'Activo' },
        { name: 'Ana Martínez', email: 'ana@ejemplo.com', phone: '3156667788', orders: 0, status: 'Inactivo' }
    ];
    
    saveClient() {
        this.successMsg = true;
        setTimeout(() => {
            this.showModal = false;
            this.successMsg = false;
        }, 2000);
    }
}
