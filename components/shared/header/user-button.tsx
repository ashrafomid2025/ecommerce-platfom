import React from "react";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/action/auth.action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserIcon } from "lucide-react";
async function UserButton() {
  const session = await auth();
  if (!session) {
    return (
      <Button asChild>
        <Link href="/sign-in">
          <UserIcon /> Sign In
        </Link>
      </Button>
    );
  }
  const firstLetterOfName = session.user?.name?.charAt(0).toUpperCase() || "";
  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-center items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center"
            >
              {firstLetterOfName}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex flex-col gap-2">
            <div className="font-medium">{session.user?.name}</div>
            <div className="text-sm text-muted-foreground">
              {session.user?.email}
            </div>
            <div>
              <form action={signOutUser}>
                <Button type="submit" variant="ghost">
                  Sign Out
                </Button>
              </form>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserButton;
