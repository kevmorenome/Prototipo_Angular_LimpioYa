
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="navbar">
      <div class="logo">
        <a routerLink="/">
          <span class="material-symbols-rounded logo-icon">local_laundry_service</span>
          LimpioYa
        </a>
      </div>
      <div class="links">
        <a routerLink="/login" class="btn btn-outline">Iniciar sesión</a>
        <a routerLink="/register" class="btn btn-primary">Registrarse</a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 2rem; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(8px); box-shadow: var(--shadow-sm); position: sticky; top: 0; z-index: 50; }
    .logo { display: flex; align-items: center; gap: 0.5rem; }
    .logo a { display: flex; align-items: center; gap: 0.5rem; font-size: 1.5rem; font-weight: 800; color: var(--primary-600); text-decoration: none; letter-spacing: -0.025em; }
    .logo-icon { font-size: 2rem; color: var(--secondary-500); }
    .links { display: flex; gap: 1rem; align-items: center; }
  `]
})
export class NavbarComponent {}
