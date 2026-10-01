import { Injectable, signal } from "@angular/core";
@Injectable({ providedIn: "root" })
export class NotificationService {
  message = signal("");
  error = signal(false);
  show(message: string, error = false) {
    this.message.set(message);
    this.error.set(error);
    setTimeout(() => this.message.set(""), 5000);
  }
}
