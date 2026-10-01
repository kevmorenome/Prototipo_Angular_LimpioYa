import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { BrandComponent } from "../brand/brand.component";
@Component({
  standalone: true,
  selector: "ly-navbar",
  imports: [RouterLink, BrandComponent],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {}
