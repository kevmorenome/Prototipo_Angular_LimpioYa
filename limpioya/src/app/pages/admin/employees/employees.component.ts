import { Component } from "@angular/core";
import { EntityManagerComponent } from "../../../components/entity-manager/entity-manager.component";
@Component({
  standalone: true,
  selector: "ly-admin-employees",
  imports: [EntityManagerComponent],
  templateUrl: "./employees.component.html",
  styleUrl: "./employees.component.css",
})
export class EmployeesComponent {}
