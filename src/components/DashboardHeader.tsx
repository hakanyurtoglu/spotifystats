import { getSession } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getSpotifyProfile } from "@/lib/spotify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import SpotifyIcon from "./SpotifyIcon";

const DashboardHeader = async () => {
  const session = await getSession();
  const user = await getSpotifyProfile(session.accessToken);

  return (
    <div className="flex p-4 w-screen items-center justify-between">
      <div className="flex items-center justify-center gap-x-2">
        <SpotifyIcon className="text-3xl" />
        <p className="text-xl text">Spotify Stats</p>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user.images[0]} />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="text-center">
              asdasd
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
