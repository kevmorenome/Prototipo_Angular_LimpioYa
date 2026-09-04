
import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../../services/service.service';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule, RouterLink],
  template: `
    <div class="layout-wrapper">
      <app-sidebar role="CLIENT"></app-sidebar>
      <main class="main-content">
        <h1>Crear Nuevo Pedido</h1>
        
        <div class="card" *ngIf="successMessage">
            <div class="alert alert-success">
                <h3>¡Pedido creado correctamente!</h3>
                <p>Número de pedido: <strong>{{ createdOrderId }}</strong></p>
                <div style="margin-top: 1rem">
                    <a [routerLink]="['/cliente/pedidos', createdOrderId]" class="btn btn-primary">Ver Pedido</a>
                    <button class="btn btn-outline" style="margin-left: 1rem" (click)="resetForm()">Crear otro</button>
                </div>
            </div>
        </div>
        
        <div class="grid-2" *ngIf="!successMessage">
            <div class="card">
                <h2>Agregar Prendas</h2>
                
                <div class="form-group">
                    <label>Servicio</label>
                    <select class="form-control" [(ngModel)]="currentItem.serviceId" (change)="onServiceChange()">
                        <option value="">Seleccione un servicio</option>
                        <option *ngFor="let s of services" [value]="s.id">{{ s.name }} - {{ s.price | currency:'COP':'symbol':'1.0-0' }}</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Prenda</label>
                    <select class="form-control" [(ngModel)]="currentItem.garment">
                        <option value="">Seleccione prenda</option>
                        <option value="Camisa">Camisa</option>
                        <option value="Pantalón">Pantalón</option>
                        <option value="Vestido">Vestido</option>
                        <option value="Chaqueta">Chaqueta</option>
                        <option value="Otras">Otras</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Cantidad</label>
                    <input type="number" class="form-control" [(ngModel)]="currentItem.quantity" min="1">
                </div>
                
                <button class="btn btn-secondary w-100" (click)="addItem()" [disabled]="!isValidItem()">Agregar al pedido</button>
            </div>
            
            <div class="card">
                <h2>Resumen del Pedido</h2>
                
                <div *ngIf="items.length === 0" class="text-center py-4 text-muted">
                    No has agregado ninguna prenda.
                </div>
                
                <table *ngIf="items.length > 0">
                    <thead>
                        <tr>
                            <th>Prenda</th>
                            <th>Servicio</th>
                            <th>Cant.</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let item of items; let i = index">
                            <td>{{ item.garment }}</td>
                            <td>{{ item.serviceName }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.subtotal | currency:'COP':'symbol':'1.0-0' }}</td>
                            <td><button class="btn btn-sm btn-danger" (click)="removeItem(i)">X</button></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="text-right"><strong>TOTAL:</strong></td>
                            <td colspan="2"><strong>{{ total | currency:'COP':'symbol':'1.0-0' }}</strong></td>
                        </tr>
                    </tfoot>
                </table>
                
                <div class="mt-4" *ngIf="items.length > 0">
                    <button class="btn btn-primary w-100" (click)="confirmOrder()">Confirmar Pedido</button>
                </div>
            </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .w-100 { width: 100%; }
    .btn-danger { background: var(--danger); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; border: none; cursor: pointer; }
    .text-right { text-align: right; }
    .mt-4 { margin-top: 1.5rem; }
    .alert-success { background: #d1fae5; color: #065f46; padding: 2rem; border-radius: 8px; text-align: center; }
    .text-muted { color: var(--text-muted); }
    .py-4 { padding: 2rem 0; }
    .text-center { text-align: center; }
    @media (max-width: 768px) {
        .grid-2 { grid-template-columns: 1fr; }
    }
  `]
})
export class CreateOrderComponent {
    serviceService = inject(ServiceService);
    orderService = inject(OrderService);
    authService = inject(AuthService);
    router = inject(Router);
    
    services = this.serviceService.getServices();
    
    items: any[] = [];
    total = 0;
    
    currentItem: any = { serviceId: '', serviceName: '', garment: '', quantity: 1, unitPrice: 0, subtotal: 0 };
    
    successMessage = false;
    createdOrderId = '';
    
    onServiceChange() {
        const s = this.services.find(x => x.id === this.currentItem.serviceId);
        if(s) {
            this.currentItem.serviceName = s.name;
            this.currentItem.unitPrice = s.price;
        }
    }
    
    isValidItem() {
        return this.currentItem.serviceId && this.currentItem.garment && this.currentItem.quantity > 0;
    }
    
    addItem() {
        if(!this.isValidItem()) return;
        
        const item = { ...this.currentItem };
        item.subtotal = item.quantity * item.unitPrice;
        this.items.push(item);
        
        this.calculateTotal();
        
        this.currentItem = { serviceId: '', serviceName: '', garment: '', quantity: 1, unitPrice: 0, subtotal: 0 };
    }
    
    removeItem(index: number) {
        this.items.splice(index, 1);
        this.calculateTotal();
    }
    
    calculateTotal() {
        this.total = this.items.reduce((acc, item) => acc + item.subtotal, 0);
    }
    
    confirmOrder() {
        if(this.items.length === 0) return;
        
        const user = this.authService.currentUserValue;
        
        // estimated date + 3 days
        const estimated = new Date();
        estimated.setDate(estimated.getDate() + 3);
        
        const orderData = {
            clientId: user?.id,
            clientName: user?.name,
            status: 'Recibido',
            total: this.total,
            estimatedDate: estimated.toISOString().split('T')[0],
            paymentStatus: 'Pendiente',
            items: this.items
        };
        
        const newOrder = this.orderService.addOrder(orderData as any);
        this.createdOrderId = newOrder.id;
        this.successMessage = true;
    }
    
    resetForm() {
        this.items = [];
        this.total = 0;
        this.successMessage = false;
        this.createdOrderId = '';
    }
}
