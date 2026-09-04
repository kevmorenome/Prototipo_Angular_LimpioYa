
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="card login-card">
        <a routerLink="/" class="back-link">&larr; Volver al inicio</a>
        <h1 class="logo"><a routerLink="/" style="text-decoration: none; color: inherit;">LimpioYa</a></h1>
        <p class="subtitle">Crear cuenta</p>
        
        <div class="success" *ngIf="success">
            Registro realizado correctamente. <br><br>
            <a routerLink="/login" class="btn btn-primary">Ir al Login</a>
        </div>

        <form (ngSubmit)="onSubmit()" *ngIf="!success">
          <div class="form-group">
            <label>Nombre completo</label>
            <input type="text" class="form-control" [(ngModel)]="data.name" name="name" required>
          </div>
          <div class="form-group">
            <label>Correo electrónico</label>
            <input type="email" class="form-control" [(ngModel)]="data.email" name="email" required>
          </div>
          <div class="form-group">
            <label>Teléfono</label>
            <input type="text" class="form-control" [(ngModel)]="data.phone" name="phone" required>
          </div>
          <div class="form-group">
            <label>Contraseña</label>
            <input type="password" class="form-control" [(ngModel)]="data.password" name="password" required>
          </div>
          <div class="form-group">
            <label>Confirmar contraseña</label>
            <input type="password" class="form-control" [(ngModel)]="data.confirm" name="confirm" required>
          </div>
          <button type="submit" class="btn btn-primary w-100" [disabled]="data.password !== data.confirm || !data.password">Registrarse</button>
          
          <div class="links">
              ¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: var(--background); padding: 2rem 0;}
    .login-card { width: 100%; max-width: 450px; padding: 2.5rem; position: relative; }
    .back-link { position: absolute; top: 1rem; left: 1rem; font-size: 0.9rem; color: var(--text-muted); text-decoration: none; }
    .back-link:hover { color: var(--primary); }
    .logo { text-align: center; color: var(--primary); font-size: 2rem; margin-bottom: 0; }
    .subtitle { text-align: center; color: var(--text-muted); margin-bottom: 1.5rem; }
    .w-100 { width: 100%; margin-top: 1rem; }
    .success { background: #d1fae5; color: #065f46; padding: 1rem; border-radius: 4px; text-align: center; margin-bottom: 1rem; }
    .links { text-align: center; margin-top: 1.5rem; font-size: 0.9rem; }
    .links a { color: var(--primary); text-decoration: none; font-weight: bold; }
  `]
})
export class RegisterComponent {
  data = {
      name: '', email: '', phone: '', password: '', confirm: ''
  };
  success = false;
  authService = inject(AuthService);

  onSubmit() {
      if(this.data.password === this.data.confirm && this.data.password) {
          this.authService.register(this.data);
          this.success = true;
      }
  }
}
