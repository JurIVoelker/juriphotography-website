import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define an array of paths that require authentication
const privatePaths = ["/dashboard", "/dashboard/*"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the current path starts with any of the private paths
  const isPrivatePath = privatePaths.some((privatePath) =>
    path.startsWith(privatePath)
  );

  const token = request.cookies.get("jwt")?.value || "";

  // If it's a private path and there's no token, redirect to login
  if (isPrivatePath && !token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${encodeURIComponent(path)}`, request.nextUrl)
    );
  }

  // For all other cases, allow the request to proceed
  return NextResponse.next();
}

// Configure the matcher to include all routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
