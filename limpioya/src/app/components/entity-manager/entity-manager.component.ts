import { Component, input, inject, signal, computed } from "@angular/core";
import {
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from "@angular/forms";
import { ClientService } from "../../services/client.service";
import { EmployeeService, ROLES } from "../../services/employee.service";
import { ServiceService } from "../../services/service.service";
import { OrderService } from "../../services/order.service";
import { NotificationService } from "../../services/notification.service";
import { ModalComponent } from "../modal/modal.component";
import { DataTableComponent } from "../data-table/data-table.component";
import { OrderTableComponent } from "../order-table/order-table.component";
import { EmptyStateComponent } from "../empty-state/empty-state.component";
import { IconComponent } from "../icon/icon.component";
import { Client, Employee, LaundryService, money } from "../../models/models";
type RecordItem = Client & Partial<Employee> & Partial<LaundryService>;
@Component({
  standalone: true,
  selector: "ly-entity-manager",
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ModalComponent,
    DataTableComponent,
    OrderTableComponent,
    EmptyStateComponent,
    IconComponent,
  ],
  templateUrl: "./entity-manager.component.html",
  styleUrl: "./entity-manager.component.css",
})
export class EntityManagerComponent {
  kind = input<"clients" | "employees" | "services">("clients");
  clients = inject(ClientService);
  employees = inject(EmployeeService);
  services = inject(ServiceService);
  orders = inject(OrderService);
  notice = inject(NotificationService);
  fb = inject(FormBuilder);
  search = signal("");
  filter = signal("");
  modal = signal(false);
  editing = signal<RecordItem | null>(null);
  info = signal<RecordItem | null>(null);
  history = signal<RecordItem | null>(null);
  money = money;
  roles = ROLES;
  form = this.fb.nonNullable.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    email: [""],
    phone: [""],
    role: ["Empleado"],
    description: [""],
    price: [8000],
    active: [true],
  });
  all = computed(
    () =>
      (this.kind() === "clients"
        ? this.clients.records()
        : this.kind() === "employees"
          ? this.employees.records()
          : this.services.records()) as RecordItem[],
  );
  records = computed(() =>
    this.all().filter(
      (r) =>
        (r.name + " " + (r.email || "") + " " + (r.role || ""))
          .toLowerCase()
          .includes(this.search().toLowerCase()) &&
        (!this.filter() || String(r.active) === this.filter()),
    ),
  );
  get title() {
    return this.kind() === "clients"
      ? "Gestión de clientes"
      : this.kind() === "employees"
        ? "Gestión de empleados"
        : "Servicios y precios";
  }
  get singular() {
    return this.kind() === "clients"
      ? "cliente"
      : this.kind() === "employees"
        ? "empleado"
        : "servicio";
  }
  count(id: number) {
    return this.orders.records().filter((o) => o.clientId === id).length;
  }
  clientHistory(id: number) {
    return this.orders.records().filter((o) => o.clientId === id);
  }
  open(r?: RecordItem) {
    this.editing.set(r || null);
    this.form.reset({
      name: r?.name || "",
      email: r?.email || "",
      phone: r?.phone || "",
      role: r?.role || "Empleado",
      description: r?.description || "",
      price: r?.price || 8000,
      active: r?.active ?? true,
    });
    this.form.controls.email.setValidators(
      this.kind() === "services" ? [] : [Validators.required, Validators.email],
    );
    this.form.controls.phone.setValidators(
      this.kind() === "clients"
        ? [Validators.required, Validators.pattern(/^[0-9 +()-]{7,20}$/)]
        : [],
    );
    this.form.controls.description.setValidators(
      this.kind() === "services"
        ? [Validators.required, Validators.minLength(5)]
        : [],
    );
    this.form.controls.price.setValidators(
      this.kind() === "services"
        ? [Validators.required, Validators.min(100), Validators.max(1000000)]
        : [],
    );
    for (const control of Object.values(this.form.controls))
      control.updateValueAndValidity();
    this.modal.set(true);
  }
  save() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    const current = this.editing();
    const id = current?.id || Math.max(0, ...this.all().map((r) => r.id)) + 1;
    if (
      this.kind() !== "services" &&
      this.all().some(
        (r) => r.id !== id && r.email.toLowerCase() === v.email.toLowerCase(),
      )
    ) {
      this.notice.show("Ya existe un registro con este correo.", true);
      return;
    }
    if (this.kind() === "clients") {
      const item: Client = {
        id,
        name: v.name.trim(),
        email: v.email.trim().toLowerCase(),
        phone: v.phone,
        active: v.active,
      };
      current ? this.clients.update(item) : this.clients.add(item);
    } else if (this.kind() === "employees") {
      const item: Employee = {
        id,
        name: v.name.trim(),
        email: v.email.trim().toLowerCase(),
        phone: v.phone,
        role: v.role,
        active: v.active,
      };
      current ? this.employees.update(item) : this.employees.add(item);
    } else {
      const item: LaundryService = {
        id,
        name: v.name.trim(),
        description: v.description,
        price: Number(v.price),
        active: v.active,
      };
      current ? this.services.update(item) : this.services.add(item);
    }
    this.modal.set(false);
    this.notice.show(
      current
        ? "Registro actualizado correctamente"
        : "Registro creado correctamente",
    );
  }
  toggle(r: RecordItem) {
    if (this.kind() === "clients")
      this.clients.update({ ...r, active: !r.active });
    else if (this.kind() === "employees")
      this.employees.update({ ...r, active: !r.active } as Employee);
    else
      this.services.update({
        ...r,
        active: !r.active,
      } as unknown as LaundryService);
    this.notice.show(r.active ? "Registro desactivado" : "Registro activado");
  }
}
