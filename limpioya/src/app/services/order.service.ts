import { Injectable, computed, inject } from "@angular/core";
import { LocalStore } from "../shared/storage";
import { Order, Line, STATUSES, today } from "../models/models";
import { ClientService } from "./client.service";
@Injectable({ providedIn: "root" })
export class OrderService extends LocalStore<Order> {
  clients = inject(ClientService);
  constructor() {
    super(
      "ly-orders",
      Array.from({ length: 15 }, (_, i) => {
        const clientId = i < 7 ? 1 : (i % 7) + 2;
        const names = [
          "Santiago Moreno",
          "Mariana Torres",
          "Carlos Rodríguez",
          "Valentina Gómez",
          "Andrés Ruiz",
          "Camila López",
          "Daniel Castro",
          "Isabella Rojas",
        ];
        const price = [8000, 5000, 18000][i % 3];
        const quantity = 2 + (i % 4);
        return {
          id: "PED-2026-" + String(i + 1).padStart(4, "0"),
          clientId,
          client: names[clientId - 1],
          date: "2026-09-" + String(30 - i).padStart(2, "0"),
          delivery:
            "2026-" +
            (i < 3
              ? "10-0" + (i + 1)
              : "09-" + String(32 - i).padStart(2, "0")),
          status:
            STATUSES[[3, 8, 0, 10, 10, 5, 10, 9, 4, 2, 10, 6, 10, 1, 7][i]],
          total: price * quantity,
          paid: i % 3 !== 0,
          method: ["Tarjeta", "PSE", "Efectivo", "Billetera digital"][i % 4],
          lines: [
            {
              service: ["Lavado", "Planchado", "Tintorería"][i % 3],
              garment: ["Camisa", "Pantalón", "Vestido", "Chaqueta"][i % 4],
              quantity,
              price,
            },
          ],
        };
      }),
    );
  }
  update(order: Order) {
    this.save(this.records().map((x) => (x.id === order.id ? order : x)));
  }
  create(clientId: number, client: string, lines: Line[]) {
    const next =
      Math.max(0, ...this.records().map((x) => Number(x.id.split("-").pop()))) +
      1;
    const d = new Date(today() + "T12:00:00");
    d.setDate(d.getDate() + 3);
    const order: Order = {
      id: "PED-2026-" + String(next).padStart(4, "0"),
      clientId,
      client,
      date: today(),
      delivery: d.toISOString().slice(0, 10),
      status: "Recibido",
      total: lines.reduce((s, x) => s + x.quantity * x.price, 0),
      paid: false,
      method: "Sin seleccionar",
      lines: [...lines],
    };
    this.add(order);
    return order;
  }
}
