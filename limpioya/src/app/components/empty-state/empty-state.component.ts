import { Component, input } from "@angular/core";
import { IconComponent } from "../icon/icon.component";
@Component({
  standalone: true,
  selector: "ly-empty-state",
  imports: [IconComponent],
  templateUrl: "./empty-state.component.html",
  styleUrl: "./empty-state.component.css",
})
export class EmptyStateComponent {
  title = input("Sin resultados");
  text = input("Prueba con otro filtro o crea tu primer registro.");
}
