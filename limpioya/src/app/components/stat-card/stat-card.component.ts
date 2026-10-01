import { Component, input } from "@angular/core";
import { IconComponent } from "../icon/icon.component";
@Component({
  standalone: true,
  selector: "ly-stat-card",
  imports: [IconComponent],
  templateUrl: "./stat-card.component.html",
  styleUrl: "./stat-card.component.css",
})
export class StatCardComponent {
  label = input("");
  value = input<string | number>("");
  hint = input("");
  icon = input("bag");
  tone = input("blue");
}
