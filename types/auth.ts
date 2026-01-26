export type AuthRole = "guest" | "driver" | "employee" | "admin";

export type AuthCredential = {
  label: string;
  username: string;
  password: string;
  role: Exclude<AuthRole, "guest">;
};

export type AuthState = {
  role: AuthRole;
  username: string | null;
};

export type AuthLoginResult = {
  success: boolean;
  message?: string;
};

export type AuthContextValue = AuthState & {
  login: (username: string, password: string) => AuthLoginResult;
  logout: () => void;
};
