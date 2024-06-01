import { getSession, spotify } from "@/lib/auth";
import { OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const stateCookie = cookies().get("spotify_auth_state")?.value;

  if (!state || !stateCookie || !code || stateCookie !== state) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await spotify.validateAuthorizationCode(code);
    const session = await getSession();

    session.accessToken = tokens.accessToken;
    session.refreshToken = tokens.refreshToken;
    session.expiresIn = tokens.accessTokenExpiresAt.toISOString();

    await session.save();

    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (e) {
    if (e instanceof OAuth2RequestError)
      return Response.json({ error: e.message });

    console.log(e);
    return Response.json({ error: e });
  }
}
