import { Component } from "@angular/core";
import { BrandComponent } from "../brand/brand.component";
@Component({
  standalone: true,
  selector: "ly-footer",
  imports: [BrandComponent],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.css",
})
export class FooterComponent {}
