import { Injectable, inject } from "@angular/core";
import { today } from "../models/models";
import { OrderService } from "./order.service";
@Injectable({ providedIn: "root" })
export class PaymentService {
  orders = inject(OrderService);
  pay(id: string, method: string, approved: boolean) {
    const order = this.orders.records().find((o) => o.id === id);
    if (!order || !approved) return false;
    this.orders.update({ ...order, paid: true, paidAt: today(), method });
    return true;
  }
}
