
import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  template: `
    <div class="layout-wrapper">
      <app-sidebar role="ADMIN"></app-sidebar>
      <main class="main-content">
        <div class="top-header">
            <div>
                <h1 style="margin-bottom: 0.25rem">Gestión de Empleados</h1>
                <p class="text-muted" style="margin:0">Controla el personal y los niveles de acceso.</p>
            </div>
            <div class="user-menu">
                <button class="btn btn-primary" (click)="showModal = true">
                    <span class="material-symbols-rounded" style="font-size: 1.2rem">badge</span>
                    Nuevo Empleado
                </button>
            </div>
        </div>
        
        <div class="card p-0 mt-4">
            <div class="table-responsive" style="border: none;">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre del Empleado</th>
                            <th>Rol / Cargo</th>
                            <th>Sede / Ubicación</th>
                            <th>Estado</th>
                            <th class="text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let emp of employees">
                            <td>
                                <div style="font-weight: 600; color: var(--text-main)">{{ emp.name }}</div>
                                <div class="text-muted" style="font-size: 0.8rem">{{ emp.email }}</div>
                            </td>
                            <td>
                                <span class="badge" [ngClass]="emp.role === 'Gerente' ? 'badge-danger' : (emp.role === 'Supervisor' ? 'badge-warning' : 'badge-info')">
                                    {{ emp.role }}
                                </span>
                            </td>
                            <td class="text-muted">{{ emp.sede }}</td>
                            <td><span class="badge" [ngClass]="emp.status === 'Activo' ? 'badge-success' : 'badge-gray'">{{ emp.status }}</span></td>
                            <td class="text-right"><button class="btn btn-secondary btn-sm">Editar</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </main>
    </div>
    
    <!-- Modal Nuevo Empleado -->
    <div class="modal-backdrop" *ngIf="showModal">
        <div class="modal card" style="max-width: 500px; width: 100%">
            <div class="flex-between mb-4">
                <h2 style="font-size: 1.25rem; margin:0">Añadir Personal</h2>
                <button class="btn btn-secondary btn-sm" (click)="showModal = false" style="padding: 0.25rem; border: none; box-shadow: none">
                    <span class="material-symbols-rounded">close</span>
                </button>
            </div>
            
            <div class="alert alert-success mb-4" *ngIf="successMsg" style="background: var(--success-bg); color: var(--success-text); padding: 1rem; border-radius: var(--radius-md)">
                Empleado añadido correctamente (Simulación).
            </div>
            
            <form (ngSubmit)="saveEmployee()" *ngIf="!successMsg">
                <div class="form-group">
                    <label>Nombre Completo</label>
                    <input type="text" class="form-control" required placeholder="Ej. Roberto Sánchez">
                </div>
                <div class="form-group">
                    <label>Correo Electrónico (Acceso)</label>
                    <input type="email" class="form-control" required placeholder="roberto@limpioya.com">
                </div>
                <div class="grid-2">
                    <div class="form-group">
                        <label>Rol</label>
                        <select class="form-control">
                            <option>Repartidor</option>
                            <option>Auxiliar de lavandería</option>
                            <option>Supervisor</option>
                            <option>Gerente</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Sede</label>
                        <select class="form-control">
                            <option>Sede Norte</option>
                            <option>Sede Central</option>
                            <option>Sede Sur</option>
                        </select>
                    </div>
                </div>
                
                <div class="flex-between mt-4">
                    <button type="button" class="btn btn-secondary" (click)="showModal = false">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar Empleado</button>
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
export class EmployeesComponent {
    showModal = false;
    successMsg = false;
    
    employees = [
        { name: 'Admin Principal', email: 'admin@limpioya.com', role: 'Gerente', sede: 'Sede Central', status: 'Activo' },
        { name: 'Laura Rodríguez', email: 'lrodriguez@limpioya.com', role: 'Supervisor', sede: 'Sede Central', status: 'Activo' },
        { name: 'Roberto Sánchez', email: 'rsanchez@limpioya.com', role: 'Repartidor', sede: 'Sede Norte', status: 'Activo' },
        { name: 'Miguel Torres', email: 'mtorres@limpioya.com', role: 'Auxiliar', sede: 'Sede Sur', status: 'Inactivo' }
    ];
    
    saveEmployee() {
        this.successMsg = true;
        setTimeout(() => {
            this.showModal = false;
            this.successMsg = false;
        }, 2000);
    }
}
