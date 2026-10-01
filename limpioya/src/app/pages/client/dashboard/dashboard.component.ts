import { recentOrders } from "../../../models/models";
import { Component, inject, computed } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { OrderService } from "../../../services/order.service";
import { ScheduleService } from "../../../services/schedule.service";
import { StatCardComponent } from "../../../components/stat-card/stat-card.component";
import { OrderTableComponent } from "../../../components/order-table/order-table.component";
import { IconComponent } from "../../../components/icon/icon.component";
import { ServiceService } from "../../../services/service.service";
import { today } from "../../../models/models";
@Component({
  standalone: true,
  selector: "ly-client-dashboard",
  imports: [RouterLink, StatCardComponent, OrderTableComponent, IconComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class ClientDashboardComponent {
  recentOrders = recentOrders;
  auth = inject(AuthService);
  store = inject(OrderService);
  services = inject(ServiceService);
  schedule = inject(ScheduleService);
  orders = computed(() =>
    this.store.records().filter((o) => o.clientId === this.auth.user()?.id),
  );
  active = computed(
    () => this.orders().filter((o) => o.status !== "Entregado").length,
  );
  completed = computed(
    () => this.orders().filter((o) => o.status === "Entregado").length,
  );
  pending = computed(() => this.orders().filter((o) => !o.paid).length);
  nextDelivery = computed(() =>
    this.schedule
      .records()
      .filter(
        (a) =>
          a.clientId === this.auth.user()?.id &&
          a.type === "Entrega" &&
          a.date >= today(),
      )
      .sort(
        (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time),
      )
      .at(0),
  );
  next = computed(() =>
    this.schedule
      .records()
      .filter((a) => a.clientId === this.auth.user()?.id && a.date >= today())
      .sort(
        (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time),
      )
      .at(0),
  );
}
