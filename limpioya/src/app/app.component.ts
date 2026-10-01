import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NotificationComponent } from "./components/notification/notification.component";
@Component({
  standalone: true,
  selector: "app-root",
  imports: [RouterOutlet, NotificationComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {}
