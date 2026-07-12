import { signInWithPopup, signOut } from "firebase/auth";

import { auth } from "./config";
import { googleProvider } from "./providers";

export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function firebaseLogout() {
  return signOut(auth);
}

export async function getFirebaseIdToken() {
  const user = auth.currentUser;

  if (!user) return null;

  return user.getIdToken();
}
