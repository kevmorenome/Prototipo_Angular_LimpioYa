import { Component, input } from "@angular/core";
import { STATUSES } from "../../models/models";
@Component({
  standalone: true,
  selector: "ly-order-timeline",
  templateUrl: "./order-timeline.component.html",
  styleUrl: "./order-timeline.component.css",
})
export class OrderTimelineComponent {
  status = input("Recibido");
  statuses = STATUSES;
  index() {
    return STATUSES.indexOf(this.status());
  }
}
