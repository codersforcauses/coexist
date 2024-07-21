import { type NextRequest, NextResponse } from "next/server";
import { pathToRegexp } from "path-to-regexp";

// This function can be marked `async` if using `await` inside
const imageRegexp = /\.(png|webp|jpeg|jpg|gif|bmp|svg)$/i;
const publicRoutes = [
  pathToRegexp("/event"),
  pathToRegexp("/event/:id"),
  pathToRegexp("/"),
  imageRegexp,
];

const isPublicRoute = (s: string) =>
  publicRoutes.some((regex) => regex.test(s));

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isLoggedIn = request.cookies.get("refresh");
  if (!isPublicRoute(pathName) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/((?!api|_next/static|/event|_next/image|favicon.ico).*)",
};
