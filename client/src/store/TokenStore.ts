import { jwtDecode, JwtPayload } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Token = {
  encoded: string;
  decoded: JwtPayload;
  expiry: number;
};

type TokenStore = {
  access?: Token;
  refresh?: Token;
  setAccess: (encoded: string) => void;
  setTokens: (accessEncoded: string, refreshEncoded: string) => void;
  clear: () => void;
};

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      access: undefined,
      refresh: undefined,
      setAccess: (encoded) => {
        const token = tryDecodeJwt(encoded);
        if (!token) return;
        set({ access: token });
      },
      setTokens: (accessEncoded, refreshEncoded) => {
        const access = tryDecodeJwt(accessEncoded);
        const refresh = tryDecodeJwt(refreshEncoded);
        if (!access || !refresh) return;
        set({
          access,
          refresh,
        });
      },
      clear: () => {
        set({ access: undefined, refresh: undefined });
      },
    }),
    {
      name: "auth-tokens",
      // TODO: possibly consider storing in cookies instead?
      // would prevent tokens being read by a script from another domain
    },
  ),
);

// Decodes the given JWT token. If the token is malformed, or the expiry is not set, returns null.
function tryDecodeJwt(encoded: string): Token | null {
  try {
    const decoded = jwtDecode(encoded);
    if (decoded.exp == undefined) return null;
    return {
      encoded,
      decoded,
      expiry: decoded.exp * 1000,
    };
  } catch {
    return null;
  }
}
