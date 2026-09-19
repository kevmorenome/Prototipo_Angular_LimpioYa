import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  template: `
    <div class="layout-wrapper">
      <app-sidebar role="ADMIN"></app-sidebar>
      <main class="main-content">
        <div class="top-header">
            <div>
                <h1 style="margin-bottom: 0.25rem">Gestión de Pedidos</h1>
                <p class="text-muted" style="margin:0">Controla el flujo de trabajo, estados y entregas de la lavandería.</p>
            </div>
        </div>
        
        <div class="card mt-4 p-0">
            <div class="filters p-4">
                <input type="text" class="form-control" placeholder="Buscar por ID o cliente..." [(ngModel)]="searchTerm" style="max-width: 320px">
                <select class="form-control" [(ngModel)]="statusFilter" style="max-width: 220px">
                    <option value="">Todos los estados</option>
                    <option *ngFor="let s of statuses" [value]="s">{{ s }}</option>
                </select>
            </div>
            
            <div class="table-responsive" style="border: none;">
                <table>
                    <thead>
                        <tr>
                            <th>ID Pedido</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Estado de Lavandería</th>
                            <th>Total</th>
                            <th>Estado Pago</th>
                            <th class="text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let order of filteredOrders()">
                            <td><div style="font-weight: 600; color: var(--primary-700)">{{ order.id }}</div></td>
                            <td><div style="font-weight: 500; color: var(--text-main)">{{ order.clientName }}</div></td>
                            <td class="text-muted">{{ order.date | date:'mediumDate' }}</td>
                            <td>
                                <select class="form-control status-select" [ngModel]="order.status" (ngModelChange)="changeStatus(order.id, $event)">
                                    <option *ngFor="let s of statuses" [value]="s">{{ s }}</option>
                                </select>
                            </td>
                            <td style="font-weight: 600">{{ order.total | currency:'COP':'symbol':'1.0-0' }}</td>
                            <td>
                                <span class="badge" [ngClass]="order.paymentStatus === 'Aprobado' || order.paymentStatus === 'Pagado' ? 'badge-success' : 'badge-warning'">
                                    {{ order.paymentStatus }}
                                </span>
                            </td>
                            <td class="text-right">
                                <button class="btn btn-secondary btn-sm" (click)="openOrderDetail(order)">
                                    <span class="material-symbols-rounded" style="font-size: 1rem">visibility</span>
                                    Ver
                                </button>
                            </td>
                        </tr>
                        <tr *ngIf="filteredOrders().length === 0">
                            <td colspan="7" class="text-center" style="padding: 3rem 1rem">
                                <span class="material-symbols-rounded" style="font-size: 3rem; color: var(--border-dark); display: block; margin-bottom: 0.5rem">search_off</span>
                                <p class="text-muted">No se encontraron pedidos con los filtros aplicados.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </main>
    </div>

    <!-- Modal Detalle del Pedido -->
    <div class="modal-backdrop" *ngIf="showDetailModal && selectedOrder">
        <div class="modal card" style="max-width: 550px; width: 100%">
            <div class="flex-between mb-4">
                <div>
                    <h2 style="font-size: 1.25rem; margin:0">Detalle de Pedido</h2>
                    <span class="text-muted" style="font-size: 0.85rem">{{ selectedOrder.id }}</span>
                </div>
                <button class="btn btn-secondary btn-sm" (click)="closeDetailModal()" style="padding: 0.25rem; border: none; box-shadow: none">
                    <span class="material-symbols-rounded">close</span>
                </button>
            </div>

            <div class="order-info-card mb-4">
                <div class="info-row">
                    <span class="info-label">Cliente:</span>
                    <span class="info-val"><strong>{{ selectedOrder.clientName }}</strong></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Fecha de Ingreso:</span>
                    <span class="info-val">{{ selectedOrder.date | date:'mediumDate' }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Entrega Estimada:</span>
                    <span class="info-val">{{ selectedOrder.estimatedDate ? (selectedOrder.estimatedDate | date:'mediumDate') : 'Por programar' }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Estado de Pago:</span>
                    <span class="info-val">
                        <span class="badge" [ngClass]="selectedOrder.paymentStatus === 'Aprobado' || selectedOrder.paymentStatus === 'Pagado' ? 'badge-success' : 'badge-warning'">
                            {{ selectedOrder.paymentStatus }}
                        </span>
                        <span *ngIf="selectedOrder.paymentMethod" class="text-muted" style="margin-left: 0.5rem; font-size: 0.85rem">
                            ({{ selectedOrder.paymentMethod }})
                        </span>
                    </span>
                </div>
                <div class="info-row" style="align-items: center">
                    <span class="info-label">Estado del Servicio:</span>
                    <span class="info-val">
                        <select class="form-control status-select" [ngModel]="selectedOrder.status" (ngModelChange)="changeStatus(selectedOrder.id, $event)">
                            <option *ngFor="let s of statuses" [value]="s">{{ s }}</option>
                        </select>
                    </span>
                </div>
            </div>

            <h3 style="font-size: 1rem; margin-bottom: 0.75rem">Prendas y Servicios</h3>
            <div class="items-list mb-4">
                <div *ngIf="selectedOrder.items && selectedOrder.items.length > 0">
                    <div *ngFor="let item of selectedOrder.items" class="item-row">
                        <div>
                            <strong>{{ item.quantity }}x {{ item.garment }}</strong>
                            <div class="text-muted" style="font-size: 0.8rem">Servicio: {{ item.serviceName }}</div>
                        </div>
                        <div style="font-weight: 600">{{ item.subtotal | currency:'COP':'symbol':'1.0-0' }}</div>
                    </div>
                </div>
                <div *ngIf="!selectedOrder.items || selectedOrder.items.length === 0" class="text-muted" style="font-size: 0.9rem; padding: 0.5rem 0">
                    Servicio estándar de lavado mixto general.
                </div>
            </div>

            <div class="total-box mb-4">
                <span>Total a Cobrar:</span>
                <span class="total-amount">{{ selectedOrder.total | currency:'COP':'symbol':'1.0-0' }}</span>
            </div>

            <div class="flex-between">
                <button type="button" class="btn btn-primary w-100" (click)="closeDetailModal()">Cerrar</button>
            </div>
        </div>
    </div>
  `,
  styles: [`
    .p-0 { padding: 0 !important; }
    .p-4 { padding: 1.5rem !important; }
    .filters { display: flex; gap: 1rem; flex-wrap: wrap; border-bottom: 1px solid var(--border-light); background: var(--bg-app); }
    .status-select { font-size: 0.85rem; padding: 0.35rem 0.6rem; width: auto; font-weight: 500; }
    
    .modal-backdrop { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(2px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 1rem; }
    .modal { animation: fadeInSlideUp 0.3s ease-out forwards; }
    
    .order-info-card { background: var(--bg-app); padding: 1rem; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.9rem; border: 1px solid var(--border-light); }
    .info-row { display: flex; justify-content: space-between; align-items: center; }
    .info-label { color: var(--text-muted); font-weight: 500; }
    
    .items-list { border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 0.75rem 1rem; background: var(--surface); }
    .item-row { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--border-light); font-size: 0.9rem; }
    .item-row:last-child { border-bottom: none; }
    
    .total-box { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--primary-50); border-radius: var(--radius-md); border: 1px solid var(--primary-100); font-weight: 600; color: var(--primary-900, #1e3a8a); }
    .total-amount { font-size: 1.25rem; color: var(--primary-700); }
  `]
})
export class OrdersComponent implements OnInit {
    orderService = inject(OrderService);
    
    orders: any[] = [];
    searchTerm = '';
    statusFilter = '';
    
    selectedOrder: any = null;
    showDetailModal = false;
    
    statuses = [
        'Recibido', 'Confirmado', 'En clasificación', 'En lavado', 'En secado', 
        'En planchado', 'Control de calidad', 'Empacado', 'Listo para entrega', 
        'En reparto', 'Entregado'
    ];
    
    ngOnInit() {
        this.loadOrders();
    }
    
    loadOrders() {
        this.orders = this.orderService.getOrders();
    }
    
    filteredOrders() {
        return this.orders.filter(o => {
            const matchesSearch = o.id.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                                  o.clientName.toLowerCase().includes(this.searchTerm.toLowerCase());
            const matchesStatus = this.statusFilter ? o.status === this.statusFilter : true;
            return matchesSearch && matchesStatus;
        });
    }
    
    changeStatus(id: string, status: string) {
        this.orderService.updateOrderStatus(id, status);
        this.loadOrders();
        if (this.selectedOrder && this.selectedOrder.id === id) {
            this.selectedOrder.status = status;
        }
    }

    openOrderDetail(order: any) {
        this.selectedOrder = { ...order };
        this.showDetailModal = true;
    }

    closeDetailModal() {
        this.showDetailModal = false;
        this.selectedOrder = null;
    }
}