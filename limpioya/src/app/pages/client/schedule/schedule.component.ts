import { Component, inject, computed } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ScheduleService } from "../../../services/schedule.service";
import { AuthService } from "../../../services/auth.service";
import { NotificationService } from "../../../services/notification.service";
import { IconComponent } from "../../../components/icon/icon.component";
import { EmptyStateComponent } from "../../../components/empty-state/empty-state.component";
import { today } from "../../../models/models";
@Component({
  standalone: true,
  selector: "ly-schedule",
  imports: [ReactiveFormsModule, IconComponent, EmptyStateComponent],
  templateUrl: "./schedule.component.html",
  styleUrl: "./schedule.component.css",
})
export class ScheduleComponent {
  fb = inject(FormBuilder);
  store = inject(ScheduleService);
  auth = inject(AuthService);
  notice = inject(NotificationService);
  minimum = today();
  form = this.fb.nonNullable.group({
    type: ["Recogida", Validators.required],
    date: [today(), Validators.required],
    time: ["09:00", Validators.required],
    address: [
      this.auth.user()?.address || "",
      [Validators.required, Validators.minLength(8)],
    ],
  });
  appointments = computed(() =>
    this.store
      .records()
      .filter((a) => a.clientId === this.auth.user()?.id)
      .slice()
      .sort(
        (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time),
      ),
  );
  save() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    if (v.date < today()) {
      this.notice.show("Selecciona una fecha actual o futura.", true);
      return;
    }
    if (
      v.date === today() &&
      v.time <
        new Date().toLocaleTimeString("es-CO", {
          timeZone: "America/Bogota",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
    ) {
      this.notice.show("Selecciona una hora futura para la cita de hoy.", true);
      return;
    }
    if (
      this.appointments().some((a) => a.date === v.date && a.time === v.time)
    ) {
      this.notice.show("Ya tienes una cita en esa fecha y hora.", true);
      return;
    }
    this.store.add({ id: Date.now(), clientId: this.auth.user()!.id, ...v });
    this.notice.show(
      v.type === "Recogida"
        ? "Recogida programada correctamente."
        : "Entrega programada correctamente.",
    );
  }
  remove(id: number) {
    this.store.remove(id);
    this.notice.show("Cita cancelada correctamente");
  }
}
