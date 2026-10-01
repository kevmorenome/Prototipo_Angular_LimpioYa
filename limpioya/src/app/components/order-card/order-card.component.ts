import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Order, money } from "../../models/models";
import { OrderStatusComponent } from "../order-status/order-status.component";
@Component({
  standalone: true,
  selector: "ly-order-card",
  imports: [RouterLink, OrderStatusComponent],
  templateUrl: "./order-card.component.html",
  styleUrl: "./order-card.component.css",
})
export class OrderCardComponent {
  order = input<Order>();
  money = money;
}
