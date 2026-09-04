
import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  template: `
    <div class="layout-wrapper">
      <app-sidebar role="CLIENT"></app-sidebar>
      <main class="main-content">
        <h1>Mi Perfil</h1>
        
        <div class="card mt-4" style="max-width: 600px;">
            <div class="alert alert-success mb-4" *ngIf="success">
                Perfil actualizado correctamente.
            </div>
            
            <form (ngSubmit)="saveProfile()">
                <div class="form-group">
                    <label>Nombre Completo</label>
                    <input type="text" class="form-control" [(ngModel)]="profileData.name" name="name" required>
                </div>
                <div class="form-group">
                    <label>Correo Electrónico</label>
                    <input type="email" class="form-control" [(ngModel)]="profileData.email" name="email" disabled>
                    <small class="text-muted">El correo electrónico no se puede cambiar.</small>
                </div>
                <div class="form-group">
                    <label>Teléfono</label>
                    <input type="text" class="form-control" [(ngModel)]="profileData.phone" name="phone">
                </div>
                
                <hr style="margin: 2rem 0; border-top: 1px solid var(--border);">
                
                <h3>Cambiar Contraseña</h3>
                <div class="form-group mt-2">
                    <label>Nueva Contraseña (Opcional)</label>
                    <input type="password" class="form-control" name="pwd">
                </div>
                
                <button type="submit" class="btn btn-primary mt-4">Guardar Cambios</button>
            </form>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .mt-4 { margin-top: 1.5rem; }
    .mt-2 { margin-top: 0.5rem; }
    .mb-4 { margin-bottom: 1.5rem; }
    .text-muted { color: var(--text-muted); font-size: 0.8rem; }
    .alert-success { background: #d1fae5; color: #065f46; padding: 1rem; border-radius: 4px; }
  `]
})
export class ProfileComponent implements OnInit {
    authService = inject(AuthService);
    
    profileData: any = { name: '', email: '', phone: '' };
    success = false;
    
    ngOnInit() {
        const user = this.authService.currentUserValue;
        if(user) {
            this.profileData = { ...user };
        }
    }
    
    saveProfile() {
        this.success = true;
        setTimeout(() => this.success = false, 3000);
    }
}
