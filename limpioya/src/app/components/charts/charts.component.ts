import { Component, input, computed } from "@angular/core";
import { Order, money } from "../../models/models";
@Component({
  standalone: true,
  selector: "ly-charts",
  templateUrl: "./charts.component.html",
  styleUrl: "./charts.component.css",
})
export class ChartsComponent {
  orders = input<Order[]>([]);
  money = money;
  completed = computed(
    () => this.orders().filter((o) => o.status === "Entregado").length,
  );
  progress = computed(
    () =>
      this.orders().filter(
        (o) => o.status !== "Entregado" && o.status !== "Recibido",
      ).length,
  );
  received = computed(
    () => this.orders().filter((o) => o.status === "Recibido").length,
  );
  gradient = computed(() => {
    const n = this.orders().length || 1;
    const a = (this.completed() / n) * 100;
    const b = a + (this.progress() / n) * 100;
    return (
      "conic-gradient(#19b5a5 0 " +
      a +
      "%, #0869e0 " +
      a +
      "% " +
      b +
      "%, #8bb9f5 " +
      b +
      "% 100%)"
    );
  });
  services = computed(() => {
    const names = [
      ...new Set(this.orders().flatMap((o) => o.lines.map((l) => l.service))),
    ];
    return names
      .map((name) => ({
        name,
        count: this.orders()
          .flatMap((o) => o.lines)
          .filter((l) => l.service === name)
          .reduce((s, l) => s + l.quantity, 0),
      }))
      .sort((a, b) => b.count - a.count);
  });
  maxServices = computed(() =>
    Math.max(1, ...this.services().map((s) => s.count)),
  );
  revenues = computed(() => {
    const days = [...new Set(this.orders().map((o) => o.date))]
      .sort()
      .slice(-7);
    return days.map((day) => ({
      day,
      value: this.orders()
        .filter((o) => o.date === day && o.paid)
        .reduce((s, o) => s + o.total, 0),
    }));
  });
  maxRevenue = computed(() =>
    Math.max(1, ...this.revenues().map((r) => r.value)),
  );
}
