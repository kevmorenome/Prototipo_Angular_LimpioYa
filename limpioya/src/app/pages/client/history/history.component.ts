import { recentOrders } from "../../../models/models";
import { Component, inject, signal, computed } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { OrderService } from "../../../services/order.service";
import { AuthService } from "../../../services/auth.service";
import { OrderTableComponent } from "../../../components/order-table/order-table.component";
import { IconComponent } from "../../../components/icon/icon.component";
import { STATUSES } from "../../../models/models";
@Component({
  standalone: true,
  selector: "ly-history",
  imports: [FormsModule, RouterLink, OrderTableComponent, IconComponent],
  templateUrl: "./history.component.html",
  styleUrl: "./history.component.css",
})
export class HistoryComponent {
  store = inject(OrderService);
  auth = inject(AuthService);
  search = signal("");
  status = signal("");
  date = signal("");
  statuses = STATUSES;
  orders = computed(() =>
    this.store
      .records()
      .filter(
        (o) =>
          o.clientId === this.auth.user()?.id &&
          o.id.toLowerCase().includes(this.search().toLowerCase()) &&
          (!this.status() || o.status === this.status()) &&
          (!this.date() || o.date === this.date()),
      )
      .slice()
      .sort(recentOrders),
  );
  clear() {
    this.search.set("");
    this.status.set("");
    this.date.set("");
  }
}
