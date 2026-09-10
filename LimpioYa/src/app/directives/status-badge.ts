import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, HostListener } from '@angular/core';

@Directive({
  selector: '[appStatusBadge]',
  standalone: true
})
export class StatusBadgeDirective implements OnChanges {
  @Input('appStatusBadge') status: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    const classesToRemove = ['badge-success', 'badge-warning', 'badge-danger', 'badge-info', 'badge-gray'];
    classesToRemove.forEach(cls => this.renderer.removeClass(this.el.nativeElement, cls));
    this.renderer.addClass(this.el.nativeElement, 'badge');

    switch (this.status) {
      case 'Entregado':
      case 'Completado':
      case 'Activo':
      case 'Pagado':
        this.renderer.addClass(this.el.nativeElement, 'badge-success');
        break;
      case 'En lavado':
      case 'En clasificación':
      case 'En secado':
      case 'En planchado':
      case 'En reparto':
      case 'Pendiente':
        this.renderer.addClass(this.el.nativeElement, 'badge-warning');
        break;
      case 'Cancelado':
        this.renderer.addClass(this.el.nativeElement, 'badge-danger');
        break;
      case 'Listo para entrega':
      case 'Confirmado':
        this.renderer.addClass(this.el.nativeElement, 'badge-info');
        break;
      default:
        this.renderer.addClass(this.el.nativeElement, 'badge-gray');
        break;
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.06)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.15s ease-in-out');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }
}