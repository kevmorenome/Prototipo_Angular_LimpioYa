import { Component, inject, signal, computed } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ServiceService } from "../../../services/service.service";
import { OrderService } from "../../../services/order.service";
import { AuthService } from "../../../services/auth.service";
import { NotificationService } from "../../../services/notification.service";
import { IconComponent } from "../../../components/icon/icon.component";
import { EmptyStateComponent } from "../../../components/empty-state/empty-state.component";
import { Line, money } from "../../../models/models";
@Component({
  standalone: true,
  selector: "ly-create-order",
  imports: [
    ReactiveFormsModule,
    RouterLink,
    IconComponent,
    EmptyStateComponent,
  ],
  templateUrl: "./create-order.component.html",
  styleUrl: "./create-order.component.css",
})
export class CreateOrderComponent {
  fb = inject(FormBuilder);
  services = inject(ServiceService);
  orders = inject(OrderService);
  auth = inject(AuthService);
  notice = inject(NotificationService);
  lines = signal<Line[]>([]);
  created = signal("");
  money = money;
  garments = ["Camisa", "Pantalón", "Vestido", "Chaqueta", "Otras"];
  form = this.fb.nonNullable.group({
    service: [
      this.services.records().find((s) => s.active)?.name || "",
      Validators.required,
    ],
    garment: ["Camisa", Validators.required],
    quantity: [
      1,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
        Validators.pattern(/^\d+$/),
      ],
    ],
  });
  total = computed(() =>
    this.lines().reduce((sum, l) => sum + l.quantity * l.price, 0),
  );
  price = signal(
    this.services
      .records()
      .find((s) => s.name === this.form.controls.service.value)?.price || 0,
  );
  constructor() {
    this.form.controls.service.valueChanges.subscribe((name) =>
      this.price.set(
        this.services.records().find((s) => s.name === name)?.price || 0,
      ),
    );
  }
  subtotal() {
    return Number(this.form.controls.quantity.value) * this.price();
  }
  add() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    const s = this.services
      .records()
      .find((x) => x.name === v.service && x.active);
    if (!s) {
      this.notice.show("Selecciona un servicio disponible.", true);
      return;
    }
    this.lines.update((lines) => [
      ...lines,
      {
        service: v.service,
        garment: v.garment,
        quantity: Number(v.quantity),
        price: s.price,
      },
    ]);
    this.form.controls.quantity.setValue(1);
  }
  remove(i: number) {
    this.lines.update((lines) => lines.filter((_, j) => j !== i));
  }
  create() {
    const user = this.auth.user();
    if (!user || !this.lines().length) return;
    const o = this.orders.create(user.id, user.name, this.lines());
    this.created.set(o.id);
    this.notice.show("Pedido creado correctamente");
  }
}
