
import { Component, Input, inject, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <!-- Mobile toggle button -->
    <button class="mobile-toggle" (click)="toggleSidebar()">
      <span class="material-symbols-rounded">menu</span>
    </button>
    
    <!-- Sidebar -->
    <aside class="sidebar" [class.open]="isOpen">
      <div class="sidebar-header">
        <div class="logo">
          <span class="material-symbols-rounded logo-icon">local_laundry_service</span>
          <span>LimpioYa</span>
        </div>
        <div class="role-badge">{{ role === 'ADMIN' ? 'Administrador' : 'Panel de Cliente' }}</div>
      </div>
      
      <div class="sidebar-scroll">
          <nav class="menu" *ngIf="role === 'CLIENT'">
            <div class="menu-label">Principal</div>
            <a routerLink="/cliente" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="closeOnMobile()">
              <span class="material-symbols-rounded">dashboard</span> Resumen
            </a>
            <a routerLink="/cliente/pedidos/nuevo" routerLinkActive="active" (click)="closeOnMobile()">
              <span class="material-symbols-rounded">add_circle</span> Nuevo Pedido
            </a>
            <a routerLink="/cliente/historial" routerLinkActive="active" (click)="closeOnMobile()">
              <span class="material-symbols-rounded">list_alt</span> Mis Pedidos
            </a>
            
            <div class="menu-label mt-4">Gestión</div>
            <a routerLink="/cliente/agenda" routerLinkActive="active" (click)="closeOnMobile()">
              <span class="material-symbols-rounded">calendar_month</span> Agenda
            </a>
            <a routerLink="/cliente/pagos" routerLinkActive="active" (click)="closeOnMobile()">
              <span class="material-symbols-rounded">receipt_long</span> Pagos y Recibos
            </a>
          </nav>

          <nav class="menu" *ngIf="role === 'ADMIN'">
            <div class="menu-label">General</div>
            <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="closeOnMobile()">
              <span class="material-symbols-rounded">insights</span> Dashboard
            </a>
            <a routerLink="/admin/metricas" routerLinkActive="active" (click)="closeOnMobile()">
              <span class="material-symbols-rounded">bar_chart</span> Métricas
            </a>
            
            <div class="menu-label mt-4">Operaciones</div>
            <a routerLink="/admin/pedidos" routerLinkActive="active" (click)="closeOnMobile()">
              <span class="material-symbols-rounded">shopping_basket</span> Pedidos
            </a>
            <a routerLink="/admin/clientes" routerLinkActive="active" (click)="closeOnMobile()">
              <span class="material-symbols-rounded">groups</span> Clientes
            </a>
            
            <div class="menu-label mt-4">Configuración</div>
            <a routerLink="/admin/empleados" routerLinkActive="active" (click)="closeOnMobile()">
              <span class="material-symbols-rounded">badge</span> Empleados
            </a>
            <a routerLink="/admin/servicios" routerLinkActive="active" (click)="closeOnMobile()">
              <span class="material-symbols-rounded">sell</span> Servicios y Precios
            </a>
          </nav>
      </div>
      
      <div class="sidebar-footer">
        <a routerLink="/{{ role === 'ADMIN' ? 'admin' : 'cliente' }}/perfil" class="user-profile" routerLinkActive="active" (click)="closeOnMobile()">
            <div class="avatar">{{ userInitial }}</div>
            <div class="user-info">
                <span class="name">{{ user?.name }}</span>
                <span class="email">{{ user?.email }}</span>
            </div>
        </a>
        <button class="btn-logout" (click)="logout()">
          <span class="material-symbols-rounded">logout</span>
        </button>
      </div>
    </aside>
    
    <!-- Backdrop for mobile -->
    <div class="sidebar-backdrop" *ngIf="isOpen" (click)="closeOnMobile()"></div>
  `,
  styles: [`
    .mobile-toggle { position: fixed; top: 1rem; right: 1rem; z-index: 50; background: white; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 0.5rem; cursor: pointer; display: none; box-shadow: var(--shadow-sm); }
    @media (max-width: 767px) { .mobile-toggle { display: block; } }
    
    .sidebar { width: 280px; background: white; border-right: 1px solid var(--border-light); display: flex; flex-direction: column; height: 100vh; position: sticky; top: 0; z-index: 40; transition: transform 0.3s ease; }
    @media (max-width: 767px) { 
        .sidebar { position: fixed; left: 0; transform: translateX(-100%); }
        .sidebar.open { transform: translateX(0); }
    }
    
    .sidebar-backdrop { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); z-index: 30; backdrop-filter: blur(2px); }
    
    .sidebar-header { padding: 2rem 1.5rem 1rem; border-bottom: 1px solid var(--border-light); }
    .logo { display: flex; align-items: center; gap: 0.5rem; font-size: 1.5rem; font-weight: 800; color: var(--primary-600); margin-bottom: 0.25rem; letter-spacing: -0.025em; }
    .logo-icon { font-size: 2rem; color: var(--secondary-500); }
    .role-badge { font-size: 0.7rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-left: 2.5rem; }
    
    .sidebar-scroll { flex: 1; overflow-y: auto; padding: 1.5rem; }
    .sidebar-scroll::-webkit-scrollbar { width: 4px; }
    .sidebar-scroll::-webkit-scrollbar-thumb { background: var(--border-dark); border-radius: 4px; }
    
    .menu { display: flex; flex-direction: column; gap: 0.25rem; }
    .menu-label { font-size: 0.7rem; font-weight: 600; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.05em; margin: 1rem 0 0.5rem 0.5rem; }
    .menu-label.mt-4 { margin-top: 1.5rem; }
    
    .menu a { padding: 0.625rem 1rem; border-radius: var(--radius-md); color: var(--text-muted); text-decoration: none; transition: all 0.2s ease; font-weight: 500; font-size: 0.875rem; display: flex; align-items: center; gap: 0.75rem; }
    .menu a .material-symbols-rounded { font-size: 1.25rem; color: var(--text-light); transition: color 0.2s; }
    .menu a:hover { background: var(--primary-50); color: var(--primary-700); }
    .menu a:hover .material-symbols-rounded { color: var(--primary-600); }
    .menu a.active { background: var(--primary-50); color: var(--primary-700); font-weight: 600; }
    .menu a.active .material-symbols-rounded { color: var(--primary-600); font-variation-settings: 'FILL' 1; }
    
    .sidebar-footer { padding: 1rem; border-top: 1px solid var(--border-light); display: flex; align-items: center; justify-content: space-between; background: var(--bg-app); }
    .user-profile { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; color: inherit; padding: 0.5rem; border-radius: var(--radius-md); transition: background 0.2s; overflow: hidden; }
    .user-profile:hover { background: var(--border-light); }
    .avatar { width: 36px; height: 36px; min-width: 36px; border-radius: 50%; background: var(--primary-100); color: var(--primary-700); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; }
    .user-info { display: flex; flex-direction: column; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
    .user-info .name { font-size: 0.875rem; font-weight: 600; color: var(--text-main); }
    .user-info .email { font-size: 0.7rem; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; }
    
    .btn-logout { background: transparent; border: none; color: var(--text-light); cursor: pointer; padding: 0.5rem; border-radius: var(--radius-md); transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
    .btn-logout:hover { background: var(--danger-bg); color: var(--danger-text); }
  `]
})
export class SidebarComponent {
  @Input() role: 'CLIENT' | 'ADMIN' = 'CLIENT';
  authService = inject(AuthService);
  router = inject(Router);
  
  user = this.authService.currentUserValue;
  isOpen = false;

  get userInitial(): string {
      return this.user?.name ? this.user.name.charAt(0).toUpperCase() : 'U';
  }

  toggleSidebar() { this.isOpen = !this.isOpen; }
  closeOnMobile() { if(window.innerWidth < 768) this.isOpen = false; }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
