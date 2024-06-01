import { Spotify } from "arctic";
import { IronSession, getIronSession, sealData } from "iron-session";
import { cookies } from "next/headers";

export const spotify = new Spotify(
  process.env.AUTH_SPOTIFY_ID,
  process.env.AUTH_SPOTIFY_SECRET,
  process.env.SPOTIFY_REDIRECT_URI
);

export const getSession = async () => {
  const session = await getIronSession<Session>(cookies(), {
    cookieName: process.env.AUTH_COOKIE_NAME,
    password: process.env.AUTH_SECRET,
  });

  return session;
};

export const encryptCookie = async (data: any) => {
  const encrypted = await sealData(data, { password: process.env.AUTH_SECRET });
  return encrypted;
};

export const isSessionExpired = (session: Session) => {
  const expireDate = new Date(session.expiresIn);
  const now = new Date();

  return expireDate.getTime() < now.getTime();
};

export const refreshTokens = async (session: IronSession<Session>) => {
  const tokens = await spotify.refreshAccessToken(session.refreshToken);

  return tokens;
};

type Session = {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
};
