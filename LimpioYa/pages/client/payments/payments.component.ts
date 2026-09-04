
import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  template: `
    <div class="layout-wrapper">
      <app-sidebar role="CLIENT"></app-sidebar>
      <main class="main-content">
        <h1>Pagos y Recibos</h1>
        
        <div class="card mt-4">
            <h2>Pedidos Pendientes de Pago</h2>
            <table *ngIf="pendingOrders.length > 0">
                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Total</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let order of pendingOrders">
                        <td><strong>{{ order.id }}</strong><br><small>{{ order.date | date }}</small></td>
                        <td>{{ order.total | currency:'COP':'symbol':'1.0-0' }}</td>
                        <td>
                            <button class="btn btn-primary" (click)="openPaymentModal(order)">Pagar Ahora</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div *ngIf="pendingOrders.length === 0" class="text-muted py-4">No tienes pagos pendientes.</div>
        </div>
        
        <div class="card mt-4">
            <h2>Historial de Pagos y Recibos</h2>
            <table *ngIf="paidOrders.length > 0">
                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Total</th>
                        <th>Método</th>
                        <th>Estado</th>
                        <th>Recibo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let order of paidOrders">
                        <td><strong>{{ order.id }}</strong></td>
                        <td>{{ order.total | currency:'COP':'symbol':'1.0-0' }}</td>
                        <td>{{ order.paymentMethod || 'Tarjeta' }}</td>
                        <td><span class="badge badge-success">Aprobado</span></td>
                        <td><button class="btn btn-outline btn-sm" (click)="viewInvoice(order)">Ver Recibo</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </main>
    </div>
    
    <!-- Modals (Simulated) -->
    <div class="modal-backdrop" *ngIf="selectedOrderToPay">
        <div class="modal card">
            <h2>Simulador de Pago</h2>
            <p>Estás pagando el pedido <strong>{{ selectedOrderToPay.id }}</strong> por <strong>{{ selectedOrderToPay.total | currency:'COP':'symbol':'1.0-0' }}</strong></p>
            
            <div class="form-group mt-4">
                <label>Método de pago simulado</label>
                <select class="form-control" [(ngModel)]="simulatedMethod">
                    <option value="Tarjeta">Tarjeta de Crédito/Débito</option>
                    <option value="PSE">PSE</option>
                    <option value="Billetera digital">Billetera Digital</option>
                </select>
            </div>
            
            <div class="form-group mt-4">
                <label>Resultado simulado de la pasarela</label>
                <select class="form-control" [(ngModel)]="simulatedResult">
                    <option value="Aprobado">Pago Aprobado</option>
                    <option value="Rechazado">Pago Rechazado</option>
                </select>
            </div>
            
            <div class="modal-actions mt-4">
                <button class="btn btn-primary" (click)="processPayment()">Procesar Pago</button>
                <button class="btn btn-outline" (click)="selectedOrderToPay = null">Cancelar</button>
            </div>
        </div>
    </div>
    
    <div class="modal-backdrop" *ngIf="invoiceToShow">
        <div class="modal card invoice-modal">
            <div class="text-center mb-4">
                <h1 style="color: var(--primary)">LimpioYa</h1>
                <p>Sistema de Gestión de Lavandería</p>
            </div>
            
            <h3>RECIBO DE PAGO</h3>
            <p><strong>Pedido:</strong> {{ invoiceToShow.id }}</p>
            <p><strong>Cliente:</strong> {{ user?.name }}</p>
            <p><strong>Fecha:</strong> {{ invoiceToShow.date | date }}</p>
            
            <hr class="my-4">
            
            <table style="width: 100%">
                <tr>
                    <td>Total Servicios</td>
                    <td class="text-right"><strong>{{ invoiceToShow.total | currency:'COP':'symbol':'1.0-0' }}</strong></td>
                </tr>
                <tr>
                    <td>Método de pago</td>
                    <td class="text-right">{{ invoiceToShow.paymentMethod || 'Tarjeta' }}</td>
                </tr>
            </table>
            
            <div class="text-center mt-4">
                <h2 class="text-success">PAGADO</h2>
                <button class="btn btn-outline mt-4" (click)="invoiceToShow = null">Cerrar</button>
            </div>
        </div>
    </div>
  `,
  styles: [`
    .mt-4 { margin-top: 1.5rem; }
    .mb-4 { margin-bottom: 1.5rem; }
    .my-4 { margin-top: 1.5rem; margin-bottom: 1.5rem; }
    .py-4 { padding: 1.5rem 0; }
    .text-muted { color: var(--text-muted); }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .text-success { color: var(--success); }
    .btn-sm { padding: 0.25rem 0.5rem; font-size: 0.8rem; }
    
    .modal-backdrop { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal { width: 100%; max-width: 500px; max-height: 90vh; overflow-y: auto; }
    .modal-actions { display: flex; gap: 1rem; }
    
    .invoice-modal { padding: 3rem; background: white; }
    hr { border: 0; border-top: 1px solid var(--border); }
  `]
})
export class PaymentsComponent implements OnInit {
    authService = inject(AuthService);
    orderService = inject(OrderService);
    
    user = this.authService.currentUserValue;
    pendingOrders: any[] = [];
    paidOrders: any[] = [];
    
    selectedOrderToPay: any = null;
    simulatedMethod = 'Tarjeta';
    simulatedResult = 'Aprobado';
    
    invoiceToShow: any = null;
    
    ngOnInit() {
        this.loadOrders();
    }
    
    loadOrders() {
        if(this.user) {
            const orders = this.orderService.getOrdersByClient(this.user.id);
            this.pendingOrders = orders.filter(o => o.paymentStatus === 'Pendiente');
            this.paidOrders = orders.filter(o => o.paymentStatus === 'Aprobado');
        }
    }
    
    openPaymentModal(order: any) {
        this.selectedOrderToPay = order;
        this.simulatedMethod = 'Tarjeta';
        this.simulatedResult = 'Aprobado';
    }
    
    processPayment() {
        if(this.selectedOrderToPay && this.simulatedResult === 'Aprobado') {
            this.orderService.updatePayment(this.selectedOrderToPay.id, 'Aprobado', this.simulatedMethod);
            this.loadOrders();
            this.selectedOrderToPay = null;
        } else {
            alert('El pago fue rechazado. Intente con otro método.');
        }
    }
    
    viewInvoice(order: any) {
        this.invoiceToShow = order;
    }
}
