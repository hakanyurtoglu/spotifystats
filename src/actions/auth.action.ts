"use server";

import { getSession, spotify } from "@/lib/auth";
import { generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async () => {
  const state = generateState();
  const url = await spotify.createAuthorizationURL(state);

  cookies().set({
    name: "spotify_auth_state",
    value: state,
    httpOnly: true,
  });

  console.log(url.toString());

  redirect(url.toString());
};

export const signOut = async () => {
  const session = await getSession();
  console.log("sasasas");

  if (!session) return redirect("/");

  session.destroy();
  redirect("/");
};
