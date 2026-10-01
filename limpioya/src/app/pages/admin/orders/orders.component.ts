import { recentOrders } from "../../../models/models";
import { Component, inject, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { OrderService } from "../../../services/order.service";
import { NotificationService } from "../../../services/notification.service";
import { DataTableComponent } from "../../../components/data-table/data-table.component";
import { IconComponent } from "../../../components/icon/icon.component";
import { EmptyStateComponent } from "../../../components/empty-state/empty-state.component";
import { STATUSES, money } from "../../../models/models";
@Component({
  standalone: true,
  selector: "ly-admin-orders",
  imports: [
    FormsModule,
    RouterLink,
    DataTableComponent,
    IconComponent,
    EmptyStateComponent,
  ],
  templateUrl: "./orders.component.html",
  styleUrl: "./orders.component.css",
})
export class AdminOrdersComponent {
  store = inject(OrderService);
  notice = inject(NotificationService);
  search = signal("");
  status = signal("");
  payment = signal("");
  date = signal("");
  statuses = STATUSES;
  money = money;
  orders = computed(() =>
    this.store
      .records()
      .filter(
        (o) =>
          (o.id + " " + o.client)
            .toLowerCase()
            .includes(this.search().toLowerCase()) &&
          (!this.status() || o.status === this.status()) &&
          (!this.payment() || String(o.paid) === this.payment()) &&
          (!this.date() || o.date === this.date()),
      )
      .slice()
      .sort(recentOrders),
  );
  change(id: string, status: string) {
    const o = this.store.records().find((o) => o.id === id);
    if (o) {
      this.store.update({ ...o, status });
      this.notice.show("Estado del pedido actualizado");
    }
  }
  clear() {
    this.search.set("");
    this.status.set("");
    this.payment.set("");
    this.date.set("");
  }
}
