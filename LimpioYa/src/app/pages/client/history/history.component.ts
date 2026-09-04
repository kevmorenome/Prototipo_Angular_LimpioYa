
import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [SidebarComponent, CommonModule, RouterLink],
  template: `
    <div class="layout-wrapper">
      <app-sidebar role="CLIENT"></app-sidebar>
      <main class="main-content">
        
        <div class="top-header">
            <div>
                <h1 style="margin-bottom: 0.25rem">Mis Pedidos</h1>
                <p class="text-muted" style="margin:0">Historial completo de tus servicios de lavandería.</p>
            </div>
            <div class="user-menu">
                <button class="btn btn-primary" routerLink="/cliente/pedidos/nuevo">
                    <span class="material-symbols-rounded" style="font-size: 1.2rem">add</span>
                    Nuevo Pedido
                </button>
            </div>
        </div>
        
        <div class="card p-0 mt-4">
            <div class="table-responsive" style="border: none;">
                <table *ngIf="orders.length > 0">
                    <thead>
                        <tr>
                            <th>ID Pedido</th>
                            <th>Fecha de Solicitud</th>
                            <th>Monto Total</th>
                            <th>Estado de Pago</th>
                            <th>Estado Actual</th>
                            <th class="text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let order of orders">
                            <td><div style="font-weight: 600; color: var(--primary-700)">{{ order.id }}</div></td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted)">
                                    <span class="material-symbols-rounded" style="font-size: 1rem">calendar_today</span>
                                    {{ order.date | date:'mediumDate' }}
                                </div>
                            </td>
                            <td style="font-weight: 500">{{ order.total | currency:'COP':'symbol':'1.0-0' }}</td>
                            <td><span class="badge" [ngClass]="order.paymentStatus === 'Pagado' ? 'badge-success' : 'badge-warning'">{{ order.paymentStatus }}</span></td>
                            <td><span class="badge" [ngClass]="getBadgeClass(order.status)">{{ order.status }}</span></td>
                            <td class="text-right">
                                <a [routerLink]="['/cliente/pedidos', order.id]" class="btn btn-secondary btn-sm">
                                    <span class="material-symbols-rounded" style="font-size: 1rem">visibility</span>
                                    Ver Detalle
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div *ngIf="orders.length === 0" class="text-center" style="padding: 4rem 2rem">
                <span class="material-symbols-rounded" style="font-size: 3rem; color: var(--border-dark); margin-bottom: 1rem; display: block">inbox</span>
                <h3 style="margin-bottom: 0.5rem">No hay pedidos</h3>
                <p class="text-muted mb-4">Aún no has realizado ningún pedido.</p>
                <a routerLink="/cliente/pedidos/nuevo" class="btn btn-primary">Crear mi primer pedido</a>
            </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .p-0 { padding: 0 !important; }
  `]
})
export class HistoryComponent implements OnInit {
    authService = inject(AuthService);
    orderService = inject(OrderService);
    
    orders: any[] = [];
    
    ngOnInit() {
        const user = this.authService.currentUserValue;
        if(user) {
            this.orders = this.orderService.getOrdersByClient(user.id);
        }
    }
    
    getBadgeClass(status: string) {
        if(status === 'Entregado') return 'badge-success';
        if(status === 'Recibido' || status === 'Confirmado') return 'badge-gray';
        return 'badge-info';
    }
}
