import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useState } from "react";

import api from "@/lib/api";

const cookieOptions: Cookies.CookieAttributes = {
  sameSite: "Strict",
  secure: true,
};
interface tokenResponse {
  access: string;
  refresh: string;
}
interface payload extends JwtPayload {
  user_id: string;
}

const getExpiry = (tok: string) => new Date(Number(jwtDecode(tok).exp) * 1000);

const setCookies = (data: tokenResponse) => {
  const tokens = ["access", "refresh"];
  tokens.forEach((name) => {
    const tok = data[name as keyof tokenResponse];
    Cookies.set(name, tok, {
      ...cookieOptions,
      expires: getExpiry(tok),
    });
  });

  Cookies.set("refresh", data.refresh, {
    expires: getExpiry(data.refresh),
  });
};
export const useAuth = () => {
  const [userId, setUserId] = useState<string>();

  async function login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const result = await api.post("/auth/token", {
      username: username,
      password: password,
    });
    const data = result.data as tokenResponse;

    if (result.status != 200) {
      return false;
    } else {
      setCookies(data);
      setUserId(jwtDecode<payload>(data.access).user_id);
    }
  }
  function isLoggedIn() {
    return userId != null;
  }

  return { login };
};
export async function refreshAccessToken() {
  const result = await api.post("/auth/refresh", {
    refresh: Cookies.get("refresh"),
  });
  if (result.status != 200) {
  } else {
    return result.data.access;
  }
}
