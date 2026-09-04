
import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  template: `
    <div class="layout-wrapper">
      <app-sidebar role="CLIENT"></app-sidebar>
      <main class="main-content">
        <h1>Agenda de Recogida y Entrega</h1>
        
        <div class="grid-2 mt-4">
            <div class="card">
                <h2>Programar nueva cita</h2>
                
                <div class="alert alert-success mb-4" *ngIf="success">
                    Cita programada correctamente.
                </div>
                
                <form (ngSubmit)="onSubmit()">
                    <div class="form-group">
                        <label>Tipo</label>
                        <select class="form-control" [(ngModel)]="data.type" name="type" required>
                            <option value="Recogida">Recogida</option>
                            <option value="Entrega">Entrega</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Fecha</label>
                        <input type="date" class="form-control" [(ngModel)]="data.date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Hora</label>
                        <input type="time" class="form-control" [(ngModel)]="data.time" name="time" required>
                    </div>
                    <div class="form-group">
                        <label>Dirección</label>
                        <input type="text" class="form-control" [(ngModel)]="data.address" name="address" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Guardar cita</button>
                </form>
            </div>
            
            <div class="card">
                <h2>Mis Citas Programadas</h2>
                
                <div *ngIf="schedules.length === 0" class="text-muted text-center py-4">
                    No tienes citas programadas.
                </div>
                
                <div class="schedule-list" *ngIf="schedules.length > 0">
                    <div class="schedule-item" *ngFor="let s of schedules">
                        <div class="s-type" [ngClass]="{'bg-primary': s.type === 'Recogida', 'bg-secondary': s.type === 'Entrega'}">{{ s.type }}</div>
                        <div class="s-info">
                            <strong>{{ s.date | date }} a las {{ s.time }}</strong><br>
                            <span class="text-muted">{{ s.address }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .mt-4 { margin-top: 1.5rem; }
    .mb-4 { margin-bottom: 1.5rem; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .w-100 { width: 100%; }
    .alert-success { background: #d1fae5; color: #065f46; padding: 1rem; border-radius: 4px; }
    .text-muted { color: var(--text-muted); }
    .text-center { text-align: center; }
    .py-4 { padding: 2rem 0; }
    .schedule-list { display: flex; flex-direction: column; gap: 1rem; }
    .schedule-item { display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid var(--border); border-radius: 8px; }
    .s-type { padding: 0.5rem 1rem; border-radius: 4px; color: white; font-weight: bold; }
    .bg-primary { background: var(--primary); }
    .bg-secondary { background: var(--secondary); }
  `]
})
export class ScheduleComponent {
    data = { type: 'Recogida', date: '', time: '', address: 'Mi Casa - Calle Falsa 123' };
    success = false;
    
    schedules: any[] = [
        { type: 'Recogida', date: '2026-09-10', time: '10:00', address: 'Mi Casa - Calle Falsa 123' }
    ];
    
    onSubmit() {
        this.schedules.unshift({...this.data});
        this.success = true;
        setTimeout(() => this.success = false, 3000);
    }
}
