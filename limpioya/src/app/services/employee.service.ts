import { Injectable } from "@angular/core";
import { LocalStore } from "../shared/storage";
import { Employee } from "../models/models";
export const ROLES = [
  "Empleado",
  "Supervisor",
  "Repartidor",
  "Cajero",
  "Gerente",
  "Soporte",
  "Auxiliar de lavandería",
];
@Injectable({ providedIn: "root" })
export class EmployeeService extends LocalStore<Employee> {
  constructor() {
    super(
      "ly-employees",
      [
        "Ana Ramírez",
        "Luis Herrera",
        "Paula Díaz",
        "Mateo Vargas",
        "Laura Martínez",
        "Sara Méndez",
        "Juan Pérez",
      ].map((name, i) => ({
        id: i + 1,
        name,
        email: name.toLowerCase().split(" ")[0] + "@limpioya.com",
        phone: "300 555 12" + i,
        role: ROLES[i],
        active: i !== 5,
      })),
    );
  }
  update(value: Employee) {
    this.save(this.records().map((x) => (x.id === value.id ? value : x)));
  }
}
