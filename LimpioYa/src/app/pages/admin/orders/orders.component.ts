
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
        <h1>Gestión de Pedidos</h1>
        
        <div class="card mt-4">
            <div class="filters mb-4">
                <input type="text" class="form-control" placeholder="Buscar pedido..." [(ngModel)]="searchTerm" style="max-width: 300px">
                <select class="form-control" [(ngModel)]="statusFilter" style="max-width: 200px">
                    <option value="">Todos los estados</option>
                    <option *ngFor="let s of statuses" [value]="s">{{ s }}</option>
                </select>
            </div>
            
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Total</th>
                            <th>Pago</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let order of filteredOrders()">
                            <td><strong>{{ order.id }}</strong></td>
                            <td>{{ order.clientName }}</td>
                            <td>{{ order.date | date }}</td>
                            <td>
                                <select class="form-control status-select" [ngModel]="order.status" (ngModelChange)="changeStatus(order.id, $event)">
                                    <option *ngFor="let s of statuses" [value]="s">{{ s }}</option>
                                </select>
                            </td>
                            <td>{{ order.total | currency:'COP':'symbol':'1.0-0' }}</td>
                            <td>
                                <span class="badge" [ngClass]="{'badge-success': order.paymentStatus === 'Aprobado', 'badge-warning': order.paymentStatus === 'Pendiente'}">
                                    {{ order.paymentStatus }}
                                </span>
                            </td>
                            <td>
                                <button class="btn btn-outline btn-sm">Ver</button>
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
    .mt-4 { margin-top: 1.5rem; }
    .mb-4 { margin-bottom: 1.5rem; }
    .filters { display: flex; gap: 1rem; }
    .status-select { font-size: 0.8rem; padding: 0.25rem; }
    .btn-sm { padding: 0.25rem 0.5rem; font-size: 0.8rem; }
  `]
})
export class OrdersComponent implements OnInit {
    orderService = inject(OrderService);
    
    orders: any[] = [];
    searchTerm = '';
    statusFilter = '';
    
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
    }
}
