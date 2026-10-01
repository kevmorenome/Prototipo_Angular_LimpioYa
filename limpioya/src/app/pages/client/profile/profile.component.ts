import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { ClientService } from "../../../services/client.service";
import { NotificationService } from "../../../services/notification.service";
@Component({
  standalone: true,
  selector: "ly-profile",
  imports: [ReactiveFormsModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent {
  auth = inject(AuthService);
  clients = inject(ClientService);
  notice = inject(NotificationService);
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    name: [
      this.auth.user()?.name || "",
      [Validators.required, Validators.minLength(3)],
    ],
    phone: [
      this.auth.user()?.phone || "",
      [Validators.required, Validators.pattern(/^[0-9 +()-]{7,20}$/)],
    ],
    address: [
      this.auth.user()?.address || "",
      [Validators.required, Validators.minLength(8)],
    ],
  });
  save() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const user = { ...this.auth.user()!, ...this.form.getRawValue() };
    this.auth.update(user);
    const c = this.clients.records().find((x) => x.id === user.id);
    if (c) this.clients.update({ ...c, name: user.name, phone: user.phone });
    const registrations = JSON.parse(
      localStorage.getItem("ly-registrations") || "[]",
    );
    localStorage.setItem(
      "ly-registrations",
      JSON.stringify(
        registrations.map((r: any) =>
          r.id === user.id ? { ...r, ...this.form.getRawValue() } : r,
        ),
      ),
    );
    this.notice.show("Perfil actualizado correctamente");
  }
}
