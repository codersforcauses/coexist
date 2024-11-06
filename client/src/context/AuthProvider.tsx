import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect } from "react";

import { useTokenStore } from "@/store/TokenStore";

type AuthContextType = {
  userId: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

type TokenResponse = {
  access: string;
  refresh: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const accessToken = useTokenStore((state) => state.access);
  const setTokens = useTokenStore((state) => state.setTokens);
  const clearTokens = useTokenStore((state) => state.clear);

  const userId = accessToken?.decoded.user_id ?? null;
  const isLoggedIn = userId !== null;

  // Automatically set/remove a cookie when the access token changes
  // This is used by NextJS middleware to determine if the user is able to access certain routes
  // TODO: Currently role is always "user". DRF Simple JWT should be configured to include user role in the token,
  //       so that it can be set here.
  useEffect(() => {
    if (accessToken) {
      Cookies.set("user_role", "user", { sameSite: "strict", secure: true });
    } else {
      Cookies.remove("user_role");
    }
  }, [accessToken]);

  const login = async (email: string, password: string) => {
    const result = await axios.post<TokenResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/token/`,
      { username: email, password },
      {
        validateStatus: (status) => status === 200 || status === 401,
      },
    );

    if (result.status !== 200 || !result.data) {
      return false;
    }

    setTokens(result.data.access, result.data.refresh);

    return true;
  };

  const logout = async () => {
    clearTokens();
  };

  const context = { userId, isLoggedIn, login, logout };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)!;
