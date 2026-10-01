import { Component, input } from "@angular/core";
import { LaundryService, money } from "../../models/models";
import { IconComponent } from "../icon/icon.component";
@Component({
  standalone: true,
  selector: "ly-service-card",
  imports: [IconComponent],
  templateUrl: "./service-card.component.html",
  styleUrl: "./service-card.component.css",
})
export class ServiceCardComponent {
  service = input<LaundryService>();
  money = money;
}
