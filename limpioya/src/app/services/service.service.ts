import { Injectable } from "@angular/core";
import { LocalStore } from "../shared/storage";
import { LaundryService } from "../models/models";
@Injectable({ providedIn: "root" })
export class ServiceService extends LocalStore<LaundryService> {
  constructor() {
    super("ly-services", [
      {
        id: 1,
        name: "Lavado",
        description: "Limpieza y cuidado para tus prendas del día a día",
        price: 8000,
        active: true,
      },
      {
        id: 2,
        name: "Planchado",
        description: "Prendas impecables, listas para usar",
        price: 5000,
        active: true,
      },
      {
        id: 3,
        name: "Tintorería",
        description: "Tratamiento especializado para prendas delicadas",
        price: 18000,
        active: true,
      },
      {
        id: 4,
        name: "Lavado en seco",
        description: "Limpieza suave sin agua para tejidos especiales",
        price: 22000,
        active: true,
      },
      {
        id: 5,
        name: "Servicio especial",
        description: "Cuidado de cobijas, edredones y textiles grandes",
        price: 30000,
        active: true,
      },
    ]);
  }
  update(value: LaundryService) {
    this.save(this.records().map((x) => (x.id === value.id ? value : x)));
  }
}
