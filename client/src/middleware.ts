import { type NextRequest, NextResponse } from "next/server";
import { pathToRegexp } from "path-to-regexp";

// TODO: Distinguish between routes that can be accessed by attendees and posters

// This function can be marked `async` if using `await` inside
const imageRegexp = /\.(png|webp|jpeg|jpg|gif|bmp|svg)$/i;
const publicRoutes = [
  pathToRegexp("/event"),
  pathToRegexp("/event/:id"),
  pathToRegexp("/"),
  pathToRegexp("/test-page"),
  imageRegexp,
];

const isPublicRoute = (s: string) =>
  publicRoutes.some((regex) => regex.test(s));

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const userRole = request.cookies.get("user_role")?.value;
  if (!isPublicRoute(pathName) && userRole != "user") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/((?!api|_next/static|/event|_next/image|favicon.ico).*)",
};
