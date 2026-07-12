import { createContext, useEffect, useState, type ReactNode } from "react";

import type { AuthContextType, AuthUser } from "../types/auth";
import { firebaseLogout, signInWithGoogle } from "../services/firebase/auth";
import { getCurrentUser, loginWithFirebase } from "../services/api/auth";
import { onFirebaseAuthChange } from "../services/firebase/listener";

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    try {
      const result = await signInWithGoogle();

      const idToken = await result.user.getIdToken();

      const profile = await loginWithFirebase(idToken);
      console.log(profile);
      setUser(profile);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    await firebaseLogout();
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onFirebaseAuthChange(async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          setUser(null);

          return;
        }
        const profile = await getCurrentUser();

        setUser(profile);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
