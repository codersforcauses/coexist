import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import api from "@/lib/api";

const cookieOptions: Cookies.CookieAttributes = {
  sameSite: "Strict",
  secure: true,
};

interface TokenResponse {
  access: string;
  refresh: string;
}

const getExpiry = (tok: string) => new Date(Number(jwtDecode(tok).exp) * 1000);

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
  useEffect(() => {
    const access = Cookies.get("access");
    if (access) {
      setUserId(jwtDecode(access).user_id);
    }
  }, []);
  const login = async ({
    useremail,
    password,
  }: {
    useremail: string;
    password: string;
  }) => {
    try {
      const result = await api.post("/auth/token", { useremail, password });
      if (result.status !== 200) {
        return false;
      }
      const data = result.data as TokenResponse;
      setCookies(data);
      const decodedToken = jwtDecode(data.access);
      setUserId(decodedToken.user_id);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const isLoggedInFunc = () => userId !== undefined;

  return { login, isLoggedInFunc, userId };
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
