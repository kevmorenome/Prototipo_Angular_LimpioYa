import { Component } from "@angular/core";
import { EntityManagerComponent } from "../../../components/entity-manager/entity-manager.component";
@Component({
  standalone: true,
  selector: "ly-admin-services",
  imports: [EntityManagerComponent],
  templateUrl: "./services.component.html",
  styleUrl: "./services.component.css",
})
export class ServicesComponent {}
