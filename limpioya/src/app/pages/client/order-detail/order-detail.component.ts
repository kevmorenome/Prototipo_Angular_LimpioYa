import { Component, inject, computed, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { OrderService } from "../../../services/order.service";
import { AuthService } from "../../../services/auth.service";
import { NotificationService } from "../../../services/notification.service";
import { OrderTimelineComponent } from "../../../components/order-timeline/order-timeline.component";
import { OrderStatusComponent } from "../../../components/order-status/order-status.component";
import { IconComponent } from "../../../components/icon/icon.component";
import { EmptyStateComponent } from "../../../components/empty-state/empty-state.component";
import { STATUSES, money } from "../../../models/models";
@Component({
  standalone: true,
  selector: "ly-order-detail",
  imports: [
    RouterLink,
    FormsModule,
    OrderTimelineComponent,
    OrderStatusComponent,
    IconComponent,
    EmptyStateComponent,
  ],
  templateUrl: "./order-detail.component.html",
  styleUrl: "./order-detail.component.css",
})
export class OrderDetailComponent {
  route = inject(ActivatedRoute);
  params = signal(this.route.snapshot.paramMap);
  subscription = this.route.paramMap.subscribe((p) => this.params.set(p));
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  store = inject(OrderService);
  auth = inject(AuthService);
  notice = inject(NotificationService);
  statuses = STATUSES;
  money = money;
  order = computed(() =>
    this.store
      .records()
      .find(
        (o) =>
          o.id === this.params()?.get("id") &&
          (this.auth.user()?.role === "admin" ||
            o.clientId === this.auth.user()?.id),
      ),
  );
  change(status: string) {
    const o = this.order();
    if (o && STATUSES.includes(status)) {
      this.store.update({ ...o, status });
      this.notice.show("Estado actualizado correctamente");
    }
  }
  get back() {
    return this.auth.user()?.role === "admin"
      ? "/admin/pedidos"
      : "/cliente/historial";
  }
}
