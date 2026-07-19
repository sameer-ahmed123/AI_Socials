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

  // Used only for login/logout actions
  const [loading, setLoading] = useState(false);

  // Used while Firebase restores the session
  const [initializing, setInitializing] = useState(true);

  const login = async () => {
    setLoading(true);

    try {
      const result = await signInWithGoogle();

      const idToken = await result.user.getIdToken();

      const profile = await loginWithFirebase(idToken);

      setUser(profile);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await firebaseLogout();

    setUser(null);
  };
  const updateUser = (updatedUser: AuthUser) => {
    setUser(updatedUser);
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
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        initializing,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
