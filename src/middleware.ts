import { NextResponse } from "next/server";
import {
  encryptCookie,
  getSession,
  isSessionExpired,
  refreshTokens,
} from "./lib/auth";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const sessionExpired = isSessionExpired(session);
  const response = NextResponse.next();

  if (sessionExpired) {
    const tokens = await refreshTokens(session);

    // Spotify API does not always return a refresh token
    const encryptedData = await encryptCookie({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken ?? session.refreshToken,
      expiresIn: tokens.accessTokenExpiresAt.toISOString(),
    });

    response.cookies.set({
      name: process.env.AUTH_COOKIE_NAME,
      value: encryptedData,
      secure: process.env.NODE_ENV == "production",
      httpOnly: true,
    });
  }

  if (!session.accessToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return response;
}

export const config = {
  matcher: "/dashboard",
};
