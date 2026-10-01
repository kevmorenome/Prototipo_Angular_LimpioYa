import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { BrandComponent } from "../../components/brand/brand.component";
import { AuthService } from "../../services/auth.service";
import { ClientService } from "../../services/client.service";
@Component({
  standalone: true,
  selector: "ly-register",
  imports: [ReactiveFormsModule, RouterLink, BrandComponent],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  clients = inject(ClientService);
  success = signal(false);
  error = signal("");
  form = this.fb.nonNullable.group(
    {
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      phone: [
        "",
        [Validators.required, Validators.pattern(/^[0-9 +()-]{7,20}$/)],
      ],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirm: ["", Validators.required],
    },
    {
      validators: (c) =>
        c.get("password")?.value === c.get("confirm")?.value
          ? null
          : { mismatch: true },
    },
  );
  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    const id = Math.max(...this.clients.records().map((c) => c.id)) + 1;
    const email = v.email.trim().toLowerCase();
    if (
      !this.auth.register(
        {
          id,
          name: v.name,
          email,
          phone: v.phone,
          address: "",
          role: "cliente",
        },
        v.password,
      )
    ) {
      this.error.set("Este correo ya está registrado.");
      return;
    }
    this.clients.add({ id, name: v.name, email, phone: v.phone, active: true });
    this.success.set(true);
  }
}
