import { Injectable } from "@angular/core";
import { LocalStore } from "../shared/storage";
import { Appointment } from "../models/models";
@Injectable({ providedIn: "root" })
export class ScheduleService extends LocalStore<Appointment> {
  constructor() {
    super("ly-schedule", [
      {
        id: 1,
        clientId: 1,
        type: "Entrega",
        date: "2026-10-01",
        time: "14:00",
        address: "Calle 85 # 15-24, Bogotá",
      },
      {
        id: 2,
        clientId: 1,
        type: "Recogida",
        date: "2026-10-03",
        time: "09:00",
        address: "Calle 85 # 15-24, Bogotá",
      },
    ]);
  }
  remove(id: number) {
    this.save(this.records().filter((x) => x.id !== id));
  }
}
