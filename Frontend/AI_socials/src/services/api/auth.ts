import { apiFetch } from "./client";
import type { AuthUser } from "../../types/auth";

export function loginWithFirebase(idToken: string) {
  return apiFetch<AuthUser>("/auth/login/", {
    method: "POST",

    body: JSON.stringify({
      idToken,
    }),
  });
}

export function getCurrentUser() {
  return apiFetch<AuthUser>("/auth/me/", {}, true);
}
