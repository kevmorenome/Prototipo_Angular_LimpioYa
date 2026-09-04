
import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard, adminGuard, clientGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'cliente',
    canActivate: [clientGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/client/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'pedidos/nuevo', loadComponent: () => import('./pages/client/create-order/create-order.component').then(m => m.CreateOrderComponent) },
      { path: 'pedidos/:id', loadComponent: () => import('./pages/client/order-detail/order-detail.component').then(m => m.OrderDetailComponent) },
      { path: 'agenda', loadComponent: () => import('./pages/client/schedule/schedule.component').then(m => m.ScheduleComponent) },
      { path: 'pagos', loadComponent: () => import('./pages/client/payments/payments.component').then(m => m.PaymentsComponent) },
      { path: 'historial', loadComponent: () => import('./pages/client/history/history.component').then(m => m.HistoryComponent) },
      { path: 'perfil', loadComponent: () => import('./pages/client/profile/profile.component').then(m => m.ProfileComponent) }
    ]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'pedidos', loadComponent: () => import('./pages/admin/orders/orders.component').then(m => m.OrdersComponent) },
      { path: 'clientes', loadComponent: () => import('./pages/admin/clients/clients.component').then(m => m.ClientsComponent) },
      { path: 'empleados', loadComponent: () => import('./pages/admin/employees/employees.component').then(m => m.EmployeesComponent) },
      { path: 'servicios', loadComponent: () => import('./pages/admin/services/services.component').then(m => m.ServicesComponent) },
      { path: 'metricas', loadComponent: () => import('./pages/admin/metrics/metrics.component').then(m => m.MetricsComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];
