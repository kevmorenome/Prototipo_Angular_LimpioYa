import { Component, inject, input, output } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { BrandComponent } from "../brand/brand.component";
import { IconComponent } from "../icon/icon.component";
@Component({
  standalone: true,
  selector: "ly-sidebar",
  imports: [RouterLink, RouterLinkActive, BrandComponent, IconComponent],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent {
  auth = inject(AuthService);
  open = input(false);
  close = output<void>();
  get base() {
    return "/" + this.auth.user()?.role;
  }
  get items() {
    return this.auth.user()?.role === "admin"
      ? [
          { path: "", label: "Dashboard", icon: "grid" },
          { path: "/pedidos", label: "Pedidos", icon: "bag" },
          { path: "/clientes", label: "Clientes", icon: "users" },
          { path: "/empleados", label: "Empleados", icon: "user" },
          { path: "/servicios", label: "Servicios y precios", icon: "shirt" },
          { path: "/metricas", label: "Métricas", icon: "chart" },
        ]
      : [
          { path: "", label: "Inicio", icon: "grid" },
          { path: "/pedidos/nuevo", label: "Crear pedido", icon: "plus" },
          { path: "/historial", label: "Mis pedidos", icon: "bag" },
          { path: "/agenda", label: "Agenda", icon: "calendar" },
          { path: "/pagos", label: "Pagos y facturas", icon: "card" },
          { path: "/perfil", label: "Mi perfil", icon: "user" },
        ];
  }
}
