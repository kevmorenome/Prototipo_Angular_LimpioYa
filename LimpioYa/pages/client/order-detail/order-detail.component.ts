
import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [SidebarComponent, CommonModule, RouterLink],
  template: `
    <div class="layout-wrapper">
      <app-sidebar role="CLIENT"></app-sidebar>
      <main class="main-content">
        
        <div class="flex-between mb-4">
            <h1>Detalle del Pedido</h1>
            <a routerLink="/cliente/historial" class="btn btn-outline">Volver</a>
        </div>
        
        <div class="alert alert-danger" *ngIf="!order">
            Pedido no encontrado.
        </div>
        
        <ng-container *ngIf="order">
            <div class="grid-2">
                <div class="card">
                    <h2>Información</h2>
                    <p><strong>Número:</strong> {{ order.id }}</p>
                    <p><strong>Fecha:</strong> {{ order.date | date }}</p>
                    <p><strong>Entrega estimada:</strong> {{ order.estimatedDate | date }}</p>
                    <p>
                        <strong>Estado del pago:</strong> 
                        <span class="badge" [ngClass]="{'badge-success': order.paymentStatus === 'Aprobado', 'badge-warning': order.paymentStatus === 'Pendiente'}">
                            {{ order.paymentStatus }}
                        </span>
                    </p>
                    <div class="mt-4" *ngIf="order.paymentStatus === 'Pendiente'">
                        <a routerLink="/cliente/pagos" class="btn btn-primary">Ir a Pagar</a>
                    </div>
                </div>
                
                <div class="card">
                    <h2 style="font-size: 1.125rem; margin-bottom: 1.5rem">Progreso del Pedido</h2>
                    
                    <div class="timeline-container">
                        <!-- Recibido -->
                        <div class="timeline-step" [class.active]="hasReachedState('Recibido')">
                            <div class="step-icon"><span class="material-symbols-rounded">inbox</span></div>
                            <div class="step-label">Recibido</div>
                        </div>
                        
                        <div class="timeline-connector" [class.active]="hasReachedState('En Lavado')"></div>
                        
                        <!-- En Lavado -->
                        <div class="timeline-step" [class.active]="hasReachedState('En Lavado')">
                            <div class="step-icon"><span class="material-symbols-rounded">local_laundry_service</span></div>
                            <div class="step-label">En Lavado</div>
                        </div>
                        
                        <div class="timeline-connector" [class.active]="hasReachedState('Listo para entrega')"></div>
                        
                        <!-- Listo para entrega -->
                        <div class="timeline-step" [class.active]="hasReachedState('Listo para entrega')">
                            <div class="step-icon"><span class="material-symbols-rounded">checkroom</span></div>
                            <div class="step-label">Listo</div>
                        </div>
                        
                        <div class="timeline-connector" [class.active]="hasReachedState('Entregado')"></div>
                        
                        <!-- Entregado -->
                        <div class="timeline-step" [class.active]="hasReachedState('Entregado')">
                            <div class="step-icon"><span class="material-symbols-rounded">done_all</span></div>
                            <div class="step-label">Entregado</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card mt-4">
                <h2>Prendas y Servicios</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Prenda</th>
                            <th>Servicio</th>
                            <th>Cant.</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let item of order.items">
                            <td>{{ item.garment }}</td>
                            <td>{{ item.serviceName }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.subtotal | currency:'COP':'symbol':'1.0-0' }}</td>
                        </tr>
                        <tr *ngIf="!order.items || order.items.length === 0">
                            <td colspan="4" class="text-center text-muted">No hay detalles de prendas guardados en este pedido de prueba.</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="text-right"><strong>TOTAL:</strong></td>
                            <td><strong>{{ order.total | currency:'COP':'symbol':'1.0-0' }}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </ng-container>
      </main>
    </div>
  `,
  styles: [`
    .flex-between { display: flex; justify-content: space-between; align-items: center; }
    .mb-4 { margin-bottom: 1.5rem; }
    .mt-4 { margin-top: 1.5rem; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .alert-danger { background: #fee2e2; color: #b91c1c; padding: 1rem; border-radius: 4px; }
    .text-right { text-align: right; }
    .text-muted { color: var(--text-muted); }
    
    /* Timeline styles */
    .timeline-container { display: flex; justify-content: space-between; align-items: flex-start; padding: 2rem 0; max-width: 800px; margin: 0 auto; position: relative; }
    .timeline-step { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; position: relative; z-index: 2; flex: 1; }
    .step-icon { width: 48px; height: 48px; border-radius: 50%; background: var(--bg-app); border: 2px solid var(--border-light); display: flex; align-items: center; justify-content: center; color: var(--text-muted); transition: all 0.3s; }
    .step-label { font-size: 0.85rem; font-weight: 500; color: var(--text-muted); text-align: center; }
    
    .timeline-connector { flex: 1; height: 4px; background: var(--border-light); margin-top: 24px; transition: all 0.3s; z-index: 1; margin-left: -20px; margin-right: -20px; }
    
    .timeline-step.active .step-icon { background: var(--primary-600); border-color: var(--primary-600); color: white; box-shadow: 0 0 0 4px var(--primary-100); }
    .timeline-step.active .step-label { color: var(--primary-700); font-weight: 600; }
    .timeline-connector.active { background: var(--primary-600); }
  `]
})
export class OrderDetailComponent implements OnInit {
    route = inject(ActivatedRoute);
    orderService = inject(OrderService);
    
    orderId = '';
    order: any = null;
    
    statuses = [
        'Recibido', 'Confirmado', 'En clasificación', 'En lavado', 'En secado', 
        'En planchado', 'Control de calidad', 'Empacado', 'Listo para entrega', 
        'En reparto', 'Entregado'
    ];
    
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.orderId = params['id'];
            this.loadOrder();
        });
    }
    
    loadOrder() {
        this.order = this.orderService.getOrder(this.orderId);
    }
    
    hasReachedState(status: string) {
        if(!this.order) return false;
        
        // Mapeo de los 11 estados internos a 4 estados visuales principales
        const statusMap: any = {
            'Recibido': 0, 'Confirmado': 0, 'En clasificación': 0,
            'En lavado': 1, 'En secado': 1, 'En planchado': 1, 'Control de calidad': 1, 'Empacado': 1,
            'Listo para entrega': 2, 'En reparto': 2,
            'Entregado': 3
        };
        
        const currentLevel = statusMap[this.order.status] ?? 0;
        const checkLevel = statusMap[status] ?? 0;
        
        return currentLevel >= checkLevel;
    }
}
