import { recentOrders } from "../../../models/models";
import { Component, inject, computed } from "@angular/core";
import { RouterLink } from "@angular/router";
import { OrderService } from "../../../services/order.service";
import { ClientService } from "../../../services/client.service";
import { StatCardComponent } from "../../../components/stat-card/stat-card.component";
import { OrderTableComponent } from "../../../components/order-table/order-table.component";
import { ChartsComponent } from "../../../components/charts/charts.component";
import { IconComponent } from "../../../components/icon/icon.component";
import { money } from "../../../models/models";
@Component({
  standalone: true,
  selector: "ly-admin-dashboard",
  imports: [
    RouterLink,
    StatCardComponent,
    OrderTableComponent,
    ChartsComponent,
    IconComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class AdminDashboardComponent {
  recentOrders = recentOrders;
  store = inject(OrderService);
  clients = inject(ClientService);
  active = computed(
    () => this.store.records().filter((o) => o.status !== "Entregado").length,
  );
  completed = computed(
    () => this.store.records().filter((o) => o.status === "Entregado").length,
  );
  income = computed(() =>
    money(
      this.store
        .records()
        .filter((o) => o.paid)
        .reduce((s, o) => s + o.total, 0),
    ),
  );
  pending = computed(() => this.store.records().filter((o) => !o.paid).length);
}
