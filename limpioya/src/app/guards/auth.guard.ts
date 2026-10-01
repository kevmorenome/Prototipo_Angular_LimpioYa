import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
export const authGuard: CanActivateFn = (route) => {
  const user = inject(AuthService).user();
  const router = inject(Router);
  if (!user) return router.parseUrl("/login");
  return (
    user.role === route.pathFromRoot.map((r) => r.data["role"]).find(Boolean) ||
    router.parseUrl("/" + user.role)
  );
};
