import { createContext, useMemo, useState } from "react";

import { AUTH_CREDENTIALS } from "@/constants/auth";
import type { AuthContextValue, AuthState } from "@/types/auth";
import type { AppProvidersProps } from "@/types/components";

const DEFAULT_STATE: AuthState = {
  role: "guest",
  username: null,
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: AppProvidersProps) {
  const [state, setState] = useState<AuthState>(DEFAULT_STATE);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login: (username: string, password: string) => {
        const match = AUTH_CREDENTIALS.find(
          (credential) =>
            credential.username === username.trim() &&
            credential.password === password,
        );

        if (!match) {
          return {
            success: false,
            message: "Τα στοιχεία δεν είναι σωστά. Δοκίμασε ξανά.",
          };
        }

        setState({ role: match.role, username: match.username });
        return { success: true };
      },
      logout: () => setState(DEFAULT_STATE),
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
