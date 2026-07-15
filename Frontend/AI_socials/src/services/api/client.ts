import { auth } from "../firebase/config";

const API_URL = import.meta.env.VITE_API_URL;

async function getAuthHeaders(
  authenticated: boolean,
): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (!authenticated) {
    return headers;
  }

  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();

    headers.Authorization = `Bearer ${token}`;
  }
  // console.log("auth.currentUser =", auth.currentUser);

  return headers;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  authenticated = false,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      ...(await getAuthHeaders(authenticated)),
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    let error = "Something went wrong.";

    try {
      const data = await response.json();

      error = data.detail ?? error;
    } catch {
      // ignore invalid JSON
    }

    throw new Error(error);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
