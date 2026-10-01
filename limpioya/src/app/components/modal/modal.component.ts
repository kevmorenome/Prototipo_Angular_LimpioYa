import { AutoFocusDirective } from "../../directives/auto-focus.directive";
import {
  Component,
  input,
  output,
  HostListener,
  ElementRef,
  inject,
  OnDestroy,
} from "@angular/core";
import { IconComponent } from "../icon/icon.component";
@Component({
  standalone: true,
  selector: "ly-modal",
  imports: [IconComponent, AutoFocusDirective],
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.css",
})
export class ModalComponent implements OnDestroy {
  title = input("");
  close = output<void>();
  el = inject(ElementRef);
  previous = document.activeElement as HTMLElement | null;
  ngOnDestroy() {
    this.previous?.focus();
  }
  @HostListener("document:keydown", ["$event"]) key(e: KeyboardEvent) {
    if (e.key === "Escape") this.close.emit();
    if (e.key === "Tab") {
      const items = Array.from(
        this.el.nativeElement.querySelectorAll(
          "button,input,select,a[href],textarea",
        ),
      ) as HTMLElement[];
      const first = items[0],
        last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  }
}
