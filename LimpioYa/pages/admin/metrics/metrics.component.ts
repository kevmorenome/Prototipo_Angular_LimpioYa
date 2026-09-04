
import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  template: `
    <div class="layout-wrapper">
      <app-sidebar role="ADMIN"></app-sidebar>
      <main class="main-content">
        <div class="top-header">
            <div>
                <h1 style="margin-bottom: 0.25rem">Métricas y KPIs</h1>
                <p class="text-muted" style="margin:0">Rendimiento financiero y operativo de LimpioYa.</p>
            </div>
            <div class="user-menu">
                <select class="form-control" style="width: auto">
                    <option>Últimos 30 días</option>
                    <option>Últimos 7 días</option>
                    <option>Este año</option>
                </select>
            </div>
        </div>
        
        <div class="grid-4 mb-4">
            <div class="card stat-card hover-lift">
                <div class="icon-wrapper text-primary" style="background: var(--primary-100)"><span class="material-symbols-rounded">schedule</span></div>
                <h3>Tiempo promedio</h3>
                <div class="value">2.4 días</div>
            </div>
            <div class="card stat-card hover-lift">
                <div class="icon-wrapper text-success" style="background: var(--success-bg)"><span class="material-symbols-rounded">loyalty</span></div>
                <h3>Tasa de retención</h3>
                <div class="value">85%</div>
            </div>
            <div class="card stat-card hover-lift">
                <div class="icon-wrapper text-danger" style="background: var(--danger-bg)"><span class="material-symbols-rounded">cancel</span></div>
                <h3>Cancelados</h3>
                <div class="value">3%</div>
            </div>
            <div class="card stat-card hover-lift">
                <div class="icon-wrapper text-warning" style="background: var(--warning-bg)"><span class="material-symbols-rounded">star</span></div>
                <h3>Calificación</h3>
                <div class="value">4.8 / 5</div>
            </div>
        </div>
        
        <div class="card mt-4">
            <h2 style="font-size: 1.125rem; margin-bottom: 2rem">Rendimiento Mensual (Ingresos)</h2>
            <div style="height: 300px; display: flex; align-items: flex-end; gap: 2rem; border-bottom: 2px solid var(--border-light)">
                <div class="chart-bar" style="height: 40%;">Ene</div>
                <div class="chart-bar" style="height: 55%;">Feb</div>
                <div class="chart-bar" style="height: 50%;">Mar</div>
                <div class="chart-bar" style="height: 75%;">Abr</div>
                <div class="chart-bar active" style="height: 95%;">May</div>
            </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .stat-card { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.5rem; }
    .icon-wrapper { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem; }
    .icon-wrapper .material-symbols-rounded { font-size: 1.5rem; }
    .stat-card h3 { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0; }
    .stat-card .value { font-size: 2rem; font-weight: 800; color: var(--text-main); }
    
    .chart-bar { flex: 1; background: var(--primary-100); border-radius: 8px 8px 0 0; text-align: center; color: var(--primary-700); display: flex; align-items: flex-end; justify-content: center; padding-bottom: 1rem; font-weight: 600; font-size: 0.85rem; transition: background 0.3s; }
    .chart-bar:hover { background: var(--primary-200); }
    .chart-bar.active { background: var(--primary-500); color: white; }
  `]
})
export class MetricsComponent {}
