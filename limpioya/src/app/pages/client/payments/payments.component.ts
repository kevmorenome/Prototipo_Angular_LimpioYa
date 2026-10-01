import { recentOrders } from "../../../models/models";
import { Component, inject, signal, computed } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { OrderService } from "../../../services/order.service";
import { AuthService } from "../../../services/auth.service";
import { PaymentService } from "../../../services/payment.service";
import { NotificationService } from "../../../services/notification.service";
import { ModalComponent } from "../../../components/modal/modal.component";
import { BrandComponent } from "../../../components/brand/brand.component";
import { IconComponent } from "../../../components/icon/icon.component";
import { DataTableComponent } from "../../../components/data-table/data-table.component";
import { EmptyStateComponent } from "../../../components/empty-state/empty-state.component";
import { Order, money, today } from "../../../models/models";
@Component({
  standalone: true,
  selector: "ly-payments",
  imports: [
    FormsModule,
    ModalComponent,
    BrandComponent,
    IconComponent,
    DataTableComponent,
    EmptyStateComponent,
  ],
  templateUrl: "./payments.component.html",
  styleUrl: "./payments.component.css",
})
export class PaymentsComponent {
  store = inject(OrderService);
  auth = inject(AuthService);
  payments = inject(PaymentService);
  notice = inject(NotificationService);
  orders = computed(() =>
    this.store
      .records()
      .filter((o) => o.clientId === this.auth.user()?.id)
      .slice()
      .sort(recentOrders),
  );
  selected = signal<Order | null>(null);
  invoice = signal<Order | null>(null);
  method = "Tarjeta";
  result = "Pago aprobado";
  money = money;
  date = today();
  open(o: Order) {
    this.method = "Tarjeta";
    this.result = "Pago aprobado";
    this.selected.set(o);
  }
  pay() {
    const o = this.selected();
    if (!o) return;
    if (this.payments.pay(o.id, this.method, this.result === "Pago aprobado")) {
      this.selected.set(null);
      this.invoice.set(this.store.records().find((x) => x.id === o.id)!);
      this.notice.show("Pago aprobado. Tu factura está disponible.");
    } else {
      this.selected.set(null);
      this.notice.show("Pago rechazado. Puedes intentar nuevamente.", true);
    }
  }
  print() {
    window.print();
  }
}
