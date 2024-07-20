import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
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
0;
export const useAuth = () => {
  const [userId, setUserId] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const access = Cookies.get("access");
    if (access) {
      setUserId(jwtDecode(access).user_id);
    }
    const refresh = Cookies.get("refresh");
    if (refresh) {
      setIsLoggedIn(true);
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
      const result = await api.post("/auth/token/", {
        username: useremail,
        password,
      });
      if (result.status !== 200) {
        return false;
      }
      const data = result.data as TokenResponse;
      setCookies(data);
      const decodedToken = jwtDecode(data.access);
      setUserId(decodedToken.user_id);
      router.reload();
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async ({
    email,
    password,
    firstname,
    lastname,
    // confirmpassword,
    // city,
  }: {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    // confirmpassword: string;
    // city: string;
  }) => {
    //register endpoint to create a new user
    try {
      //to be replaced with the real endpoint to create user
      const result = await api.post("/users/register/", {
        first_name: firstname,
        last_name: lastname,
        username: email,
        email: email,
        password: password,
        //city: city,
      });

      if (result.status === 201) {
        await login({ useremail: email, password: password });
        router.reload();
        return true;
      } else {
        return JSON.stringify(result.data);
      }
    } catch (error: any) {
      if (error.response) {
        return JSON.stringify(error.response.data);
      } else {
        console.error("Register error:", error);
        return false;
      }
    }
  };

  const logout = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    setUserId(undefined);
    setIsLoggedIn(false);
    router.push("/");
  };

  return { login, isLoggedIn, userId, logout, register };
};

export async function refreshAccessToken() {
  try {
    const refreshTok = Cookies.get("refresh");
    if (!refreshTok) {
      throw new Error("Refresh Token Expired. Must log in");
    }
    const result = await api.post("/auth/refresh/", {
      refresh: refreshTok,
    });
    if (result.status !== 200) {
      throw new Error("Failed to refresh access token");
    }
    return result.data.access;
  } catch (error) {
    console.error("Refresh token error:", error);
    return false;
  }
}
