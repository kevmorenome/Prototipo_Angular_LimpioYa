import { Component, inject, signal, computed } from "@angular/core";
import { OrderService } from "../../../services/order.service";
import { ClientService } from "../../../services/client.service";
import { StatCardComponent } from "../../../components/stat-card/stat-card.component";
import { ChartsComponent } from "../../../components/charts/charts.component";
import { money, today } from "../../../models/models";
@Component({
  standalone: true,
  selector: "ly-metrics",
  imports: [StatCardComponent, ChartsComponent],
  templateUrl: "./metrics.component.html",
  styleUrl: "./metrics.component.css",
})
export class MetricsComponent {
  store = inject(OrderService);
  clients = inject(ClientService);
  period = signal("30 días");
  periods = ["Hoy", "7 días", "30 días", "Este año"];
  orders = computed(() => {
    const now = today();
    const d = new Date(now + "T12:00:00");
    d.setDate(d.getDate() - (this.period() === "7 días" ? 6 : 29));
    const start =
      this.period() === "Hoy"
        ? now
        : this.period() === "Este año"
          ? now.slice(0, 4) + "-01-01"
          : d.toISOString().slice(0, 10);
    return this.store.records().filter((o) => o.date >= start && o.date <= now);
  });
  completed = computed(
    () => this.orders().filter((o) => o.status === "Entregado").length,
  );
  income = computed(() =>
    money(
      this.orders()
        .filter((o) => o.paid)
        .reduce((s, o) => s + o.total, 0),
    ),
  );
  customerCount = computed(
    () => new Set(this.orders().map((o) => o.clientId)).size,
  );
  average = computed(() => {
    const delivered = this.orders().filter((o) => o.status === "Entregado");
    return delivered.length
      ? (
          delivered.reduce(
            (s, o) =>
              s +
              (new Date(o.delivery).getTime() - new Date(o.date).getTime()) /
                86400000,
            0,
          ) / delivered.length
        ).toFixed(1) + " días"
      : "Sin entregas";
  });
  popular = computed(() => {
    const count: Record<string, number> = {};
    for (const o of this.orders())
      for (const l of o.lines)
        count[l.service] = (count[l.service] || 0) + l.quantity;
    return (
      Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || "Sin datos"
    );
  });
}
