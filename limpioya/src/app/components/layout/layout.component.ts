import { Component, inject, signal } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { IconComponent } from "../icon/icon.component";
@Component({
  standalone: true,
  selector: "ly-layout",
  imports: [RouterOutlet, RouterLink, SidebarComponent, IconComponent],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.css",
})
export class LayoutComponent {
  auth = inject(AuthService);
  mobile = signal(false);
}
