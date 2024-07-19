import "react";

// customJwtPayload.ts
import { JwtPayload as OriginalJwtPayload } from "jwt-decode";

declare module "react" {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

declare module "jwt-decode" {
  export interface JwtPayload extends OriginalJwtPayload {
    user_id: string;
  }
}
