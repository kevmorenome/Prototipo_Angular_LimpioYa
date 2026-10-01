import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { IconComponent } from "../../components/icon/icon.component";
import { ServiceCardComponent } from "../../components/service-card/service-card.component";
import { ServiceService } from "../../services/service.service";
@Component({
  standalone: true,
  selector: "ly-landing",
  imports: [
    RouterLink,
    NavbarComponent,
    FooterComponent,
    IconComponent,
    ServiceCardComponent,
  ],
  templateUrl: "./landing.component.html",
  styleUrl: "./landing.component.css",
})
export class LandingComponent {
  services = inject(ServiceService);
}
