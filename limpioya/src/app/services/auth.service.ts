import { Injectable, signal, inject } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../models/models";
@Injectable({ providedIn: "root" })
export class AuthService {
  router = inject(Router);
  user = signal<User | null>(this.read());
  read(): User | null {
    try {
      return JSON.parse(localStorage.getItem("ly-session") || "null");
    } catch {
      return null;
    }
  }
  login(email: string, password: string) {
    const registered = JSON.parse(
      localStorage.getItem("ly-registrations") || "[]",
    ) as (User & { password: string })[];
    const match = registered.find(
      (u) => u.email === email && u.password === password,
    );
    let u: User | null = null;
    if (
      password === "123456" &&
      ["cliente@limpioya.com", "admin@limpioya.com"].includes(email)
    )
      u = {
        id: email.startsWith("admin") ? 0 : 1,
        name: email.startsWith("admin") ? "Laura Martínez" : "Santiago Moreno",
        email,
        phone: "300 456 7890",
        address: "Calle 85 # 15-24, Bogotá",
        role: email.startsWith("admin") ? "admin" : "cliente",
      };
    else if (match) {
      const { password: _, ...profile } = match;
      u = profile;
    }
    if (!u) return false;
    this.update(u);
    this.router.navigateByUrl("/" + u.role);
    return true;
  }
  update(u: User) {
    this.user.set(u);
    localStorage.setItem("ly-session", JSON.stringify(u));
  }
  register(u: User, password: string) {
    const list = JSON.parse(localStorage.getItem("ly-registrations") || "[]");
    if (
      list.some((x: User) => x.email === u.email) ||
      ["cliente@limpioya.com", "admin@limpioya.com"].includes(u.email)
    )
      return false;
    localStorage.setItem(
      "ly-registrations",
      JSON.stringify([...list, { ...u, password }]),
    );
    return true;
  }
  logout() {
    this.user.set(null);
    localStorage.removeItem("ly-session");
    this.router.navigateByUrl("/login");
  }
}
