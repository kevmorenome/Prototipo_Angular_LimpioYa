import { Component, inject } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { IconComponent } from "../icon/icon.component";
@Component({
  standalone: true,
  selector: "ly-notification",
  imports: [IconComponent],
  templateUrl: "./notification.component.html",
  styleUrl: "./notification.component.css",
})
export class NotificationComponent {
  notice = inject(NotificationService);
}
