import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  console.log("middleware executed:", request.nextUrl.pathname);

  const token = request.cookies.get("sabz-token")?.value;

  if (token) {
    try {
      const decoded = jwt.decode(token) as {
        userId: string;
        role: "ADMIN" | "USER";
        iat: number;
        exp: number;
      };

      console.log("Decoded token:", decoded);

      const currentTime = Math.floor(Date.now() / 1000); 
      if (decoded.exp && decoded.exp < currentTime) {
        console.log("Token expired");
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("sabz-token");
        return response;
      }

      if (
        (request.nextUrl.pathname.startsWith("/sign") ||
          request.nextUrl.pathname.startsWith("/forgot") ||
          request.nextUrl.pathname.startsWith("/reset")) &&
        decoded.userId
      ) {
        console.log("Redirecting to /");
        return NextResponse.redirect(new URL("/", request.url));
      }

      if (
        request.nextUrl.pathname.startsWith("/admin") &&
        decoded.role !== "ADMIN"
      ) {
        console.log("Redirecting to /");
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.log("Error decoding token:", error);
      return NextResponse.next();
    }
  } else {
    if (request.nextUrl.pathname.startsWith("/admin")) {
      console.log("Redirecting to /");
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/my-account")) {
      console.log("Redirecting to /");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signup",
    "/signin",
    "/admin-pannel",
    "/forgot-password",
    "/reset-password/:path*",
    "/my-account/:path*",
  ],
};