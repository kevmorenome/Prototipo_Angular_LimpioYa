
import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  template: `
    <app-navbar></app-navbar>
    <main class="hero">
      <div class="hero-bg-shape"></div>
      <div class="content">
        <h1>Lavandería inteligente<br>para la vida moderna</h1>
        <p>Tu ropa impecable, organizada y a tiempo. El software líder para la gestión profesional de lavanderías y tintorerías.</p>
        <div class="actions">
          <a routerLink="/register" class="btn btn-lg" style="background: white; color: var(--primary-600); box-shadow: var(--shadow-lg);">Comenzar Gratis</a>
          <a routerLink="/login" class="btn btn-outline btn-lg" style="color: white; border-color: rgba(255,255,255,0.5);">Iniciar Sesión</a>
        </div>
      </div>
      <div class="hero-image-mock">
        <div class="mock-header">
            <div class="dot"></div><div class="dot"></div><div class="dot"></div>
        </div>
        <div class="mock-body">
            <div class="mock-sidebar">
                <div class="mock-sb-item active"></div>
                <div class="mock-sb-item"></div>
                <div class="mock-sb-item"></div>
            </div>
            <div class="mock-content">
                <div class="mock-top-nav">
                    <div class="mock-title-block"></div>
                    <div class="mock-avatar"></div>
                </div>
                <div class="mock-grid">
                    <div class="mock-card">
                        <div class="mock-icon blue"></div>
                        <div class="mock-lines">
                            <div class="mock-line short"></div>
                            <div class="mock-line long"></div>
                        </div>
                    </div>
                    <div class="mock-card">
                        <div class="mock-icon green"></div>
                        <div class="mock-lines">
                            <div class="mock-line short"></div>
                            <div class="mock-line long"></div>
                        </div>
                    </div>
                </div>
                <div class="mock-card w-full">
                    <div class="mock-line long mb"></div>
                    <div class="mock-line"></div>
                    <div class="mock-line"></div>
                </div>
            </div>
        </div>
      </div>
    </main>
    
    <section class="features">
      <div class="text-center" style="max-width: 600px; margin: 0 auto 4rem;">
          <h2 class="section-title">Todo lo que necesitas</h2>
          <p class="text-muted">Diseñado específicamente para optimizar tiempos, mejorar la experiencia del cliente y llevar el control total de tu negocio.</p>
      </div>
      
      <div class="grid-3 container">
        <div class="feature-card card hover-lift">
          <div class="icon-wrapper">
              <span class="material-symbols-rounded">add_shopping_cart</span>
          </div>
          <h3>Pedidos Fáciles</h3>
          <p>Selección de prendas, servicios y cálculos automáticos en segundos.</p>
        </div>
        <div class="feature-card card hover-lift">
          <div class="icon-wrapper">
              <span class="material-symbols-rounded">local_shipping</span>
          </div>
          <h3>Logística y Rutas</h3>
          <p>Agenda de recogida y entrega a domicilio perfectamente estructurada.</p>
        </div>
        <div class="feature-card card hover-lift">
          <div class="icon-wrapper">
              <span class="material-symbols-rounded">monitoring</span>
          </div>
          <h3>Trazabilidad</h3>
          <p>Línea de tiempo en tiempo real para que el cliente sepa en qué estado está su ropa.</p>
        </div>
        <div class="feature-card card hover-lift">
          <div class="icon-wrapper">
              <span class="material-symbols-rounded">receipt_long</span>
          </div>
          <h3>Facturación Rápida</h3>
          <p>Gestión de pagos, métodos y recibos integrados en el mismo flujo.</p>
        </div>
        <div class="feature-card card hover-lift">
          <div class="icon-wrapper">
              <span class="material-symbols-rounded">bar_chart</span>
          </div>
          <h3>Métricas Avanzadas</h3>
          <p>Dashboard administrativo con KPIs y gráficos de rendimiento en tiempo real.</p>
        </div>
        <div class="feature-card card hover-lift">
          <div class="icon-wrapper">
              <span class="material-symbols-rounded">groups</span>
          </div>
          <h3>Gestión de Usuarios</h3>
          <p>Perfiles separados para clientes y diferentes roles de empleados.</p>
        </div>
      </div>
    </section>
    
    <footer class="footer">
      <div class="container">
          <div class="flex-between">
              <div class="brand">
                  <span class="material-symbols-rounded">local_laundry_service</span>
                  LimpioYa
              </div>
              <p>&copy; 2026 LimpioYa Inc. (Prototipo Académico)</p>
          </div>
      </div>
    </footer>
  `,
  styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    
    .hero { position: relative; padding: 6rem 1.5rem 8rem; background: linear-gradient(135deg, var(--primary-700) 0%, var(--primary-500) 100%); color: white; overflow: hidden; display: flex; flex-direction: column; align-items: center; text-align: center; }
    .hero-bg-shape { position: absolute; top: -50%; left: -10%; width: 50%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%); transform: rotate(30deg); }
    
    .content { position: relative; z-index: 2; max-width: 700px; margin-bottom: 4rem; }
    .hero h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.05em; text-shadow: 0 4px 10px rgba(0,0,0,0.1); color: white; }
    .hero p { font-size: 1.125rem; opacity: 0.9; margin-bottom: 2.5rem; line-height: 1.6; }
    .actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    
    .hero-image-mock { position: relative; z-index: 2; width: 100%; max-width: 800px; background: white; border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); overflow: hidden; border: 1px solid rgba(255,255,255,0.2); transform: translateY(20px); }
    .mock-header { background: var(--bg-app); padding: 0.75rem 1rem; display: flex; gap: 0.5rem; border-bottom: 1px solid var(--border-light); }
    .dot { width: 12px; height: 12px; border-radius: 50%; background: #cbd5e1; }
    .dot:nth-child(1) { background: #fca5a5; } .dot:nth-child(2) { background: #fcd34d; } .dot:nth-child(3) { background: #86efac; }
    
    .mock-body { display: flex; height: 380px; }
    .mock-sidebar { width: 65px; background: var(--surface); border-right: 1px solid var(--border-light); padding: 1rem 0; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    .mock-sb-item { width: 30px; height: 30px; border-radius: 6px; background: var(--bg-app); }
    .mock-sb-item.active { background: var(--primary-100); }
    
    .mock-content { flex: 1; background: var(--bg-app); padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
    .mock-top-nav { display: flex; justify-content: space-between; align-items: center; }
    .mock-title-block { width: 120px; height: 20px; background: #cbd5e1; border-radius: 4px; }
    .mock-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--primary-100); }
    
    .mock-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
    .mock-card { background: white; border-radius: 8px; border: 1px solid var(--border-light); padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; }
    .mock-card.w-full { flex: 1; gap: 0.75rem; }
    
    .mock-icon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
    .mock-icon.blue { background: linear-gradient(135deg, var(--primary-500), var(--primary-700)); }
    .mock-icon.green { background: linear-gradient(135deg, #10b981, #047857); }
    
    .mock-lines { display: flex; flex-direction: column; gap: 0.5rem; }
    .mock-line { height: 8px; background: var(--bg-app); border-radius: 4px; }
    .mock-line.short { width: 40%; }
    .mock-line.long { width: 80%; background: #cbd5e1; }
    .mock-line.mb { margin-bottom: 0.5rem; }
    
    .features { padding: 6rem 0; background: var(--bg-app); }
    .section-title { font-size: 2.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 1rem; letter-spacing: -0.025em; }
    
    .feature-card { padding: 2rem; border: none; text-align: left; }
    .icon-wrapper { width: 48px; height: 48px; border-radius: 12px; background: var(--primary-50); color: var(--primary-600); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
    .feature-card h3 { font-size: 1.25rem; margin-bottom: 0.75rem; color: var(--text-main); }
    .feature-card p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin: 0; }
    
    .footer { padding: 2rem 0; background: white; border-top: 1px solid var(--border-light); }
    .brand { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 1.25rem; color: var(--primary-600); }
    .brand .material-symbols-rounded { font-size: 1.5rem; color: var(--secondary-500); }
  `]
})
export class LandingComponent {}
