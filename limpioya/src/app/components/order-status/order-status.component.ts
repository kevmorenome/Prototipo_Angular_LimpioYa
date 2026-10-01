import { Component, input } from "@angular/core";
@Component({
  standalone: true,
  selector: "ly-order-status",
  templateUrl: "./order-status.component.html",
  styleUrl: "./order-status.component.css",
})
export class OrderStatusComponent {
  status = input("");
}
