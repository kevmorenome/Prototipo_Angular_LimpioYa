import { Injectable } from "@angular/core";
import { LocalStore } from "../shared/storage";
import { Client } from "../models/models";
@Injectable({ providedIn: "root" })
export class ClientService extends LocalStore<Client> {
  constructor() {
    super("ly-clients", [
      {
        id: 1,
        name: "Santiago Moreno",
        email: "cliente@limpioya.com",
        phone: "300 456 7890",
        active: true,
      },
      ...[
        "Mariana Torres",
        "Carlos Rodríguez",
        "Valentina Gómez",
        "Andrés Ruiz",
        "Camila López",
        "Daniel Castro",
        "Isabella Rojas",
      ].map((name, i) => ({
        id: i + 2,
        name,
        email: name.toLowerCase().split(" ")[0] + "@correo.com",
        phone: "310 555 00" + (10 + i),
        active: i !== 5,
      })),
    ]);
  }
  update(value: Client) {
    this.save(this.records().map((x) => (x.id === value.id ? value : x)));
  }
}
