import { Component } from "@angular/core";
import { EntityManagerComponent } from "../../../components/entity-manager/entity-manager.component";
@Component({
  standalone: true,
  selector: "ly-admin-clients",
  imports: [EntityManagerComponent],
  templateUrl: "./clients.component.html",
  styleUrl: "./clients.component.css",
})
export class ClientsComponent {}
