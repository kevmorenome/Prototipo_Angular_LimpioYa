import { AfterViewInit, Directive, ElementRef, inject } from "@angular/core";

/** Focuses a control (or the first control in a container) when it is displayed. */
@Directive({ selector: "[lyAutoFocus]", standalone: true })
export class AutoFocusDirective implements AfterViewInit {
  private readonly element: ElementRef<HTMLElement> = inject(ElementRef);

  ngAfterViewInit(): void {
    const host = this.element.nativeElement;
    const selector =
      "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex='0']";
    const target = host.matches(selector)
      ? host
      : host.querySelector<HTMLElement>(selector);
    target?.focus();
  }
}
