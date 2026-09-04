
import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  template: `
    <div class="layout-wrapper">
      <app-sidebar role="ADMIN"></app-sidebar>
      <main class="main-content">
        
        <div class="top-header">
            <div>
                <h1 style="margin-bottom: 0.25rem">Resumen General</h1>
                <p class="text-muted" style="margin:0">Métricas y estado del negocio en tiempo real.</p>
            </div>
            <div class="user-menu">
                <button class="btn btn-secondary">
                    <span class="material-symbols-rounded" style="font-size: 1.2rem">download</span>
                    Exportar Reporte
                </button>
            </div>
        </div>
        
        <div class="grid-4 mb-4">
            <div class="card hover-lift kpi-card">
                <div class="kpi-icon bg-blue"><span class="material-symbols-rounded">autorenew</span></div>
                <div class="kpi-info">
                    <span class="kpi-label">Pedidos Activos</span>
                    <span class="kpi-value">{{ activeOrders }}</span>
                </div>
            </div>
            <div class="card hover-lift kpi-card">
                <div class="kpi-icon bg-green"><span class="material-symbols-rounded">task_alt</span></div>
                <div class="kpi-info">
                    <span class="kpi-label">Completados</span>
                    <span class="kpi-value">{{ completedOrders }}</span>
                </div>
            </div>
            <div class="card hover-lift kpi-card">
                <div class="kpi-icon bg-purple"><span class="material-symbols-rounded">group</span></div>
                <div class="kpi-info">
                    <span class="kpi-label">Clientes Totales</span>
                    <span class="kpi-value">342</span>
                </div>
            </div>
            <div class="card hover-lift kpi-card">
                <div class="kpi-icon bg-orange"><span class="material-symbols-rounded">trending_up</span></div>
                <div class="kpi-info">
                    <span class="kpi-label">Ingresos (Mes)</span>
                    <span class="kpi-value" style="font-size: 1.4rem">{{ ingresos | currency:'COP':'symbol':'1.0-0' }}</span>
                </div>
            </div>
        </div>
        
        <div class="grid-2 mt-4">
            <div class="card">
                <h2 style="font-size: 1.125rem; margin-bottom: 1.5rem">Estado de Pedidos</h2>
                <div class="mock-chart">
                    <div class="bar-container">
                        <div class="bar-label">
                            <span class="material-symbols-rounded" style="font-size: 1rem; color: var(--text-muted)">inbox</span>
                            Recibidos
                        </div>
                        <div class="bar-track">
                            <div class="bar bg-blue" style="width: 20%;"></div>
                        </div>
                        <div class="bar-percent">20%</div>
                    </div>
                    <div class="bar-container">
                        <div class="bar-label">
                            <span class="material-symbols-rounded" style="font-size: 1rem; color: var(--text-muted)">local_laundry_service</span>
                            En proceso
                        </div>
                        <div class="bar-track">
                            <div class="bar bg-purple" style="width: 50%;"></div>
                        </div>
                        <div class="bar-percent">50%</div>
                    </div>
                    <div class="bar-container">
                        <div class="bar-label">
                            <span class="material-symbols-rounded" style="font-size: 1rem; color: var(--text-muted)">checkroom</span>
                            Listos
                        </div>
                        <div class="bar-track">
                            <div class="bar bg-orange" style="width: 15%;"></div>
                        </div>
                        <div class="bar-percent">15%</div>
                    </div>
                    <div class="bar-container">
                        <div class="bar-label">
                            <span class="material-symbols-rounded" style="font-size: 1rem; color: var(--text-muted)">done_all</span>
                            Entregados
                        </div>
                        <div class="bar-track">
                            <div class="bar bg-green" style="width: 15%;"></div>
                        </div>
                        <div class="bar-percent">15%</div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <h2 style="font-size: 1.125rem; margin-bottom: 1.5rem">Servicios más solicitados</h2>
                <div class="mock-chart">
                    <div class="bar-container">
                        <div class="bar-label">Lavado General</div>
                        <div class="bar-track">
                            <div class="bar" style="width: 80%; background: var(--primary-500)"></div>
                        </div>
                    </div>
                    <div class="bar-container">
                        <div class="bar-label">Planchado</div>
                        <div class="bar-track">
                            <div class="bar" style="width: 60%; background: var(--primary-400)"></div>
                        </div>
                    </div>
                    <div class="bar-container">
                        <div class="bar-label">Tintorería</div>
                        <div class="bar-track">
                            <div class="bar" style="width: 30%; background: var(--primary-300)"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .kpi-card { display: flex; align-items: center; gap: 1.25rem; padding: 1.5rem; }
    .kpi-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
    .kpi-icon .material-symbols-rounded { font-size: 1.75rem; color: white; }
    
    .bg-blue { background: linear-gradient(135deg, var(--primary-500), var(--primary-700)); }
    .bg-green { background: linear-gradient(135deg, #10b981, #047857); }
    .bg-purple { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }
    .bg-orange { background: linear-gradient(135deg, #f59e0b, #b45309); }
    
    .kpi-info { display: flex; flex-direction: column; }
    .kpi-label { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; }
    .kpi-value { font-size: 1.75rem; font-weight: 800; color: var(--text-main); line-height: 1; }
    
    .mock-chart { display: flex; flex-direction: column; gap: 1.25rem; }
    .bar-container { display: flex; align-items: center; gap: 1rem; }
    .bar-label { width: 120px; font-size: 0.875rem; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; }
    .bar-track { flex: 1; height: 12px; background: var(--border-light); border-radius: 999px; overflow: hidden; }
    .bar { height: 100%; border-radius: 999px; }
    .bar-percent { width: 40px; text-align: right; font-size: 0.875rem; font-weight: 600; color: var(--text-muted); }
  `]
})
export class DashboardComponent implements OnInit {
    orderService = inject(OrderService);
    
    activeOrders = 0;
    completedOrders = 0;
    ingresos = 0;
    
    ngOnInit() {
        const orders = this.orderService.getOrders();
        this.activeOrders = orders.filter(o => o.status !== 'Entregado').length;
        this.completedOrders = orders.filter(o => o.status === 'Entregado').length;
        this.ingresos = orders.reduce((acc, o) => acc + o.total, 0);
    }
}
