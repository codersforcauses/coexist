import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useState } from "react";

import api from "@/lib/api";

const cookieOptions: Cookies.CookieAttributes = {
  sameSite: "Strict",
  secure: true,
};

interface TokenResponse {
  access: string;
  refresh: string;
}

interface Payload extends JwtPayload {
  user_id: string;
}

const getExpiry = (tok: string) =>
  new Date(Number(jwtDecode<Payload>(tok).exp) * 1000);

const setCookies = (data: TokenResponse) => {
  const tokens = ["access", "refresh"] as const;
  tokens.forEach((name) => {
    const tok = data[name];
    Cookies.set(name, tok, {
      ...cookieOptions,
      expires: getExpiry(tok),
    });
  });
};

export const useAuth = () => {
  const [userId, setUserId] = useState<string>();

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const result = await api.post("/auth/token", { username, password });
      if (result.status !== 200) {
        return false;
      }
      const data = result.data as TokenResponse;
      setCookies(data);
      const decodedToken = jwtDecode<Payload>(data.access);
      setUserId(decodedToken.user_id);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const isLoggedIn = () => userId !== undefined;

  return { login, isLoggedIn, userId };
};

export async function refreshAccessToken() {
  try {
    const refreshTok = Cookies.get("refresh");
    if (!refreshTok) {
      throw new Error("Refresh Token Expired. Must log in");
    }
    const result = await api.post("/auth/refresh", {
      refresh: refreshTok,
    });
    if (result.status !== 200) {
      throw new Error("Failed to refresh access token");
    }
    return result.data.access;
  } catch (error) {
    console.error("Refresh token error:", error);
    return null;
  }
}
