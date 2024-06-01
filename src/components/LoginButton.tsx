import { signIn } from "@/actions/auth.action";
import { Button } from "./ui/button";
import SpotifyIcon from "./SpotifyIcon";

export async function LoginButton() {
  return (
    <form action={signIn}>
      <Button className="flex gap-x-2">
        <SpotifyIcon />
        Sign in with Spotify
      </Button>
    </form>
  );
}
