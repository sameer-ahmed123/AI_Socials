import { auth } from "../firebase/config";

const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  authenticated = false,
): Promise<T> {
  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (authenticated) {
    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
      throw new Error("User is not authenticated.");
    }

    const idToken = await firebaseUser.getIdToken();

    headers.set("Authorization", `Bearer ${idToken}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let error = "Something went wrong.";

    try {
      const data = await response.json();

      error = data.detail ?? error;
    } catch {
      /* empty */
    }

    throw new Error(error);
  }

  return response.json();
}
