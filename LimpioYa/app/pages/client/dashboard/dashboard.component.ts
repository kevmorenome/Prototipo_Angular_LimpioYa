
import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, CommonModule, RouterLink],
  template: `
    <div class="layout-wrapper">
      <app-sidebar role="CLIENT"></app-sidebar>
      <main class="main-content">
        
        <div class="top-header">
            <div>
                <h1 style="margin-bottom: 0.25rem">¡Hola, {{ firstName }}!</h1>
                <p class="text-muted" style="margin:0">Aquí tienes un resumen de tus prendas y pedidos.</p>
            </div>
            <div class="user-menu">
                <button class="btn btn-primary" routerLink="/cliente/pedidos/nuevo">
                    <span class="material-symbols-rounded" style="font-size: 1.2rem">add</span>
                    Nuevo Pedido
                </button>
            </div>
        </div>
        
        <div class="grid-4 mb-4">
            <div class="card hover-lift kpi-card">
                <div class="kpi-icon bg-blue"><span class="material-symbols-rounded">local_laundry_service</span></div>
                <div class="kpi-info">
                    <span class="kpi-label">Pedidos Activos</span>
                    <span class="kpi-value">{{ activeOrders.length }}</span>
                </div>
            </div>
            <div class="card hover-lift kpi-card">
                <div class="kpi-icon bg-green"><span class="material-symbols-rounded">check_circle</span></div>
                <div class="kpi-info">
                    <span class="kpi-label">Completados</span>
                    <span class="kpi-value">{{ completedOrders.length }}</span>
                </div>
            </div>
            <div class="card hover-lift kpi-card">
                <div class="kpi-icon bg-purple"><span class="material-symbols-rounded">schedule</span></div>
                <div class="kpi-info">
                    <span class="kpi-label">Próxima Entrega</span>
                    <span class="kpi-value text-sm">{{ nextDelivery ? (nextDelivery | date:'shortDate') : 'Ninguna' }}</span>
                </div>
            </div>
            <div class="card hover-lift kpi-card">
                <div class="kpi-icon bg-orange"><span class="material-symbols-rounded">payments</span></div>
                <div class="kpi-info">
                    <span class="kpi-label">Pagos Pendientes</span>
                    <span class="kpi-value">{{ pendingPayments }}</span>
                </div>
            </div>
        </div>
        
        <div class="card mt-4 p-0">
            <div class="card-header flex-between">
                <h2 style="font-size: 1.125rem; margin:0">Mis pedidos recientes</h2>
                <a routerLink="/cliente/historial" class="btn btn-outline btn-sm">Ver todos</a>
            </div>
            
            <div class="table-responsive" style="border: none; border-radius: 0 0 var(--radius-lg) var(--radius-lg)">
                <table>
                    <thead>
                        <tr>
                            <th>ID Pedido</th>
                            <th>Fecha</th>
                            <th>Estado Actual</th>
                            <th>Monto Total</th>
                            <th>Entrega Est.</th>
                            <th class="text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let order of recentOrders">
                            <td>
                                <div style="font-weight: 600; color: var(--primary-700)">{{ order.id }}</div>
                            </td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted)">
                                    <span class="material-symbols-rounded" style="font-size: 1rem">calendar_today</span>
                                    {{ order.date | date:'mediumDate' }}
                                </div>
                            </td>
                            <td><span class="badge" [ngClass]="getBadgeClass(order.status)">{{ order.status }}</span></td>
                            <td style="font-weight: 500">{{ order.total | currency:'COP':'symbol':'1.0-0' }}</td>
                            <td class="text-muted">{{ order.estimatedDate | date:'mediumDate' }}</td>
                            <td class="text-right">
                                <a [routerLink]="['/cliente/pedidos', order.id]" class="btn btn-secondary btn-sm">
                                    <span class="material-symbols-rounded" style="font-size: 1rem">visibility</span>
                                    Detalle
                                </a>
                            </td>
                        </tr>
                        <tr *ngIf="recentOrders.length === 0">
                            <td colspan="6" class="text-center" style="padding: 3rem 1rem">
                                <span class="material-symbols-rounded" style="font-size: 3rem; color: var(--border-dark); margin-bottom: 1rem; display: block">inbox</span>
                                <p class="text-muted">No tienes pedidos recientes.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .p-0 { padding: 0 !important; }
    .card-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-light); background: rgba(248, 250, 252, 0.5); border-radius: var(--radius-lg) var(--radius-lg) 0 0; }
    
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
    .kpi-value.text-sm { font-size: 1.25rem; }
  `]
})
export class DashboardComponent implements OnInit {
    authService = inject(AuthService);
    orderService = inject(OrderService);
    
    user = this.authService.currentUserValue;
    orders: any[] = [];
    activeOrders: any[] = [];
    completedOrders: any[] = [];
    recentOrders: any[] = [];
    nextDelivery: string = '';
    pendingPayments: number = 0;
    
    get firstName() {
        return this.user?.name ? this.user.name.split(' ')[0] : 'Cliente';
    }
    
    ngOnInit() {
        if(this.user) {
            this.orders = this.orderService.getOrdersByClient(this.user.id);
            this.activeOrders = this.orders.filter(o => o.status !== 'Entregado');
            this.completedOrders = this.orders.filter(o => o.status === 'Entregado');
            this.recentOrders = this.orders.slice(0, 5);
            this.pendingPayments = this.orders.filter(o => o.paymentStatus === 'Pendiente').length;
            
            if (this.activeOrders.length > 0) {
                const sorted = [...this.activeOrders].sort((a,b) => new Date(a.estimatedDate).getTime() - new Date(b.estimatedDate).getTime());
                this.nextDelivery = sorted[0].estimatedDate;
            }
        }
    }
    
    getBadgeClass(status: string) {
        if(status === 'Entregado') return 'badge-success';
        if(status === 'Recibido' || status === 'Confirmado') return 'badge-gray';
        return 'badge-info';
    }
}
