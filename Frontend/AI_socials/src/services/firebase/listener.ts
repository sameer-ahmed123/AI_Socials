import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";

export function onFirebaseAuthChange(
    callback: Parameters<typeof onAuthStateChanged>[1],
) {
    return onAuthStateChanged(auth, callback);
}