import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { BrandComponent } from "../../components/brand/brand.component";
import { IconComponent } from "../../components/icon/icon.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { AuthService } from "../../services/auth.service";
import { NotificationService } from "../../services/notification.service";
@Component({
  standalone: true,
  selector: "ly-login",
  imports: [
    ReactiveFormsModule,
    RouterLink,
    BrandComponent,
    IconComponent,
    ModalComponent,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  notice = inject(NotificationService);
  form = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });
  recover = signal(false);
  recovery = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
  });
  error = signal("");
  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    if (!this.auth.login(v.email.trim().toLowerCase(), v.password))
      this.error.set(
        "Correo o contraseña incorrectos. Prueba con una cuenta demo.",
      );
  }
  demo(role: string) {
    this.form.setValue({ email: role + "@limpioya.com", password: "123456" });
    this.submit();
  }
  reset() {
    this.recovery.markAllAsTouched();
    if (this.recovery.invalid) return;
    this.recover.set(false);
    this.notice.show(
      "Solicitud simulada correctamente. No se enviará ningún correo.",
    );
  }
}
