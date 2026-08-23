import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtils } from "./utils/jwtUtils";
import { IRole } from "./utils/type";

const AUTH_ROUTES = ["/auth/login", "/auth/register"];

const PUBLIC_ROUTES = [
  "/",
  "/service",
  "/contact",
  "/about",
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // =========================
  // Get Access Token
  // =========================

  const accessToken = request.cookies.get("accessToken")?.value;

  // =========================
  // Verify Access Token
  // =========================

  let decodedToken: ReturnType<typeof jwtUtils.verifyToken> | null = null;

  if (accessToken) {
    decodedToken = jwtUtils.verifyToken(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    );
  }

  // =========================
  // Get User Role
  // =========================

  let userRole: IRole | null = null;

  if (
    decodedToken?.success &&
    decodedToken.data &&
    typeof decodedToken.data !== "string" &&
    typeof decodedToken.data === "object" &&
    "role" in decodedToken.data
  ) {
    userRole = decodedToken.data.role as IRole;
  }

  // =========================
  // Authentication Status
  // =========================

  const isAuthenticated =
    !!accessToken && decodedToken?.success === true;

  // =========================
  // Route Check
  // =========================

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(route + "/")
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(route + "/")
  );

  // =========================
  // Invalid / Expired Token
  // =========================

  if (accessToken && !isAuthenticated) {
    const response = NextResponse.redirect(
      new URL("/auth/login", request.url)
    );

    response.cookies.delete("accessToken");

    return response;
  }

  // =========================
  // Guest Protection
  // =========================

  if (
    !isAuthenticated &&
    !isPublicRoute &&
    !isAuthRoute
  ) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  // =========================
  // Logged-in User -> Auth Pages
  // =========================

  if (isAuthenticated && isAuthRoute) {
    if (userRole === IRole.CUSTOMER) {
      return NextResponse.redirect(
        new URL("/dashboard/customer", request.url)
      );
    }

    if (userRole === IRole.TECHNICIAN) {
      return NextResponse.redirect(
        new URL("/dashboard/technician", request.url)
      );
    }

    if (userRole === IRole.ADMIN) {
      return NextResponse.redirect(
        new URL("/dashboard/admin", request.url)
      );
    }

    // Unknown role
    const response = NextResponse.redirect(
      new URL("/auth/login", request.url)
    );

    response.cookies.delete("accessToken");

    return response;
  }

  // =========================
  // Customer Authorization
  // =========================

  if (pathname.startsWith("/dashboard/customer")) {
    if (userRole !== IRole.CUSTOMER) {
      return NextResponse.redirect(
        new URL("/not-found", request.url)
      );
    }
  }

  // =========================
  // Technician Authorization
  // =========================

  if (pathname.startsWith("/dashboard/technician")) {
    if (userRole !== IRole.TECHNICIAN) {
      return NextResponse.redirect(
        new URL("/not-found", request.url)
      );
    }
  }

  // =========================
  // Admin Authorization
  // =========================

  if (pathname.startsWith("/dashboard/admin")) {
    if (userRole !== IRole.ADMIN) {
      return NextResponse.redirect(
        new URL("/not-found", request.url)
      );
    }
  }

  // =========================
  // Everything Okay
  // =========================

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};