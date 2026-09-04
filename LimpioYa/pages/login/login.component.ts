
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="card login-card">
        <a routerLink="/" class="back-link">&larr; Volver al inicio</a>
        <h1 class="logo"><a routerLink="/" style="text-decoration: none; color: inherit;">LimpioYa</a></h1>
        <p class="subtitle">Iniciar sesión</p>
        
        <div class="error" *ngIf="error">Credenciales incorrectas</div>

        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Correo electrónico</label>
            <input type="email" class="form-control" [(ngModel)]="email" name="email" required>
          </div>
          <div class="form-group">
            <label>Contraseña</label>
            <input type="password" class="form-control" [(ngModel)]="password" name="password" required>
          </div>
          <button type="submit" class="btn btn-primary w-100">Ingresar</button>
        </form>
        
        <div class="links">
            <a routerLink="/register">Registrarse</a> | <a href="#">Recuperar contraseña</a>
        </div>
        
        <div class="test-credentials">
          <p><strong>Cliente de prueba:</strong> cliente&#64;limpioya.com / 123456</p>
          <p><strong>Admin de prueba:</strong> admin&#64;limpioya.com / 123456</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: var(--background); }
    .login-card { width: 100%; max-width: 400px; padding: 2.5rem; position: relative; }
    .back-link { position: absolute; top: 1rem; left: 1rem; font-size: 0.9rem; color: var(--text-muted); text-decoration: none; }
    .back-link:hover { color: var(--primary); }
    .logo { text-align: center; color: var(--primary); font-size: 2rem; margin-bottom: 0; }
    .subtitle { text-align: center; color: var(--text-muted); margin-bottom: 1.5rem; }
    .w-100 { width: 100%; margin-top: 1rem; }
    .error { color: var(--danger); background: #fee2e2; padding: 0.5rem; border-radius: 4px; margin-bottom: 1rem; text-align: center; }
    .links { text-align: center; margin-top: 1.5rem; font-size: 0.9rem; }
    .links a { color: var(--primary); text-decoration: none; }
    .test-credentials { margin-top: 2rem; font-size: 0.8rem; background: #f3f4f6; padding: 1rem; border-radius: 4px; }
    .test-credentials p { margin: 0.25rem 0; }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  error = false;
  
  authService = inject(AuthService);
  router = inject(Router);

  onSubmit() {
    this.error = false;
    if (this.authService.login(this.email, this.password)) {
      const role = this.authService.currentUserValue?.role;
      if (role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/cliente']);
      }
    } else {
      this.error = true;
    }
  }
}
