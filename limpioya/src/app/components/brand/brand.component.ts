import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { IconComponent } from "../icon/icon.component";
@Component({
  standalone: true,
  selector: "ly-brand",
  imports: [RouterLink, IconComponent],
  templateUrl: "./brand.component.html",
  styleUrl: "./brand.component.css",
})
export class BrandComponent {}
