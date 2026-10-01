import { Routes } from "@angular/router";
import { LayoutComponent } from "./components/layout/layout.component";
import { authGuard } from "./guards/auth.guard";
export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadComponent: () =>
      import("./pages/landing/landing.component").then(
        (m) => m.LandingComponent,
      ),
  },
  {
    path: "login",
    loadComponent: () =>
      import("./pages/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "register",
    loadComponent: () =>
      import("./pages/register/register.component").then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: "cliente",
    component: LayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    data: { role: "cliente" },
    children: [
      {
        path: "",
        pathMatch: "full",
        loadComponent: () =>
          import("./pages/client/dashboard/dashboard.component").then(
            (m) => m.ClientDashboardComponent,
          ),
      },
      {
        path: "pedidos/nuevo",
        loadComponent: () =>
          import("./pages/client/create-order/create-order.component").then(
            (m) => m.CreateOrderComponent,
          ),
      },
      {
        path: "pedidos/:id",
        loadComponent: () =>
          import("./pages/client/order-detail/order-detail.component").then(
            (m) => m.OrderDetailComponent,
          ),
      },
      {
        path: "agenda",
        loadComponent: () =>
          import("./pages/client/schedule/schedule.component").then(
            (m) => m.ScheduleComponent,
          ),
      },
      {
        path: "pagos",
        loadComponent: () =>
          import("./pages/client/payments/payments.component").then(
            (m) => m.PaymentsComponent,
          ),
      },
      {
        path: "historial",
        loadComponent: () =>
          import("./pages/client/history/history.component").then(
            (m) => m.HistoryComponent,
          ),
      },
      {
        path: "perfil",
        loadComponent: () =>
          import("./pages/client/profile/profile.component").then(
            (m) => m.ProfileComponent,
          ),
      },
    ],
  },
  {
    path: "admin",
    component: LayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    data: { role: "admin" },
    children: [
      {
        path: "",
        pathMatch: "full",
        loadComponent: () =>
          import("./pages/admin/dashboard/dashboard.component").then(
            (m) => m.AdminDashboardComponent,
          ),
      },
      {
        path: "pedidos",
        loadComponent: () =>
          import("./pages/admin/orders/orders.component").then(
            (m) => m.AdminOrdersComponent,
          ),
      },
      {
        path: "pedidos/:id",
        loadComponent: () =>
          import("./pages/client/order-detail/order-detail.component").then(
            (m) => m.OrderDetailComponent,
          ),
      },
      {
        path: "clientes",
        loadComponent: () =>
          import("./pages/admin/clients/clients.component").then(
            (m) => m.ClientsComponent,
          ),
      },
      {
        path: "empleados",
        loadComponent: () =>
          import("./pages/admin/employees/employees.component").then(
            (m) => m.EmployeesComponent,
          ),
      },
      {
        path: "servicios",
        loadComponent: () =>
          import("./pages/admin/services/services.component").then(
            (m) => m.ServicesComponent,
          ),
      },
      {
        path: "metricas",
        loadComponent: () =>
          import("./pages/admin/metrics/metrics.component").then(
            (m) => m.MetricsComponent,
          ),
      },
    ],
  },
  { path: "**", redirectTo: "" },
];
