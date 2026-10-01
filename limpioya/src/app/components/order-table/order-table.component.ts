import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Order, money } from "../../models/models";
import { OrderStatusComponent } from "../order-status/order-status.component";
import { DataTableComponent } from "../data-table/data-table.component";
import { EmptyStateComponent } from "../empty-state/empty-state.component";
@Component({
  standalone: true,
  selector: "ly-order-table",
  imports: [
    RouterLink,
    OrderStatusComponent,
    DataTableComponent,
    EmptyStateComponent,
  ],
  templateUrl: "./order-table.component.html",
  styleUrl: "./order-table.component.css",
})
export class OrderTableComponent {
  orders = input<Order[]>([]);
  admin = input(false);
  base = input("/cliente/pedidos");
  money = money;
  format(d: string) {
    return new Date(d + "T12:00:00").toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "short",
    });
  }
}
