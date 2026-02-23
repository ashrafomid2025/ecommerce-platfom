import React from "react";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/action/auth.action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserIcon } from "lucide-react";
import { prisma } from "@/lib/db/lib";
async function UserButton() {
  const session = await auth();
  const user = await prisma.user.findFirst({
    where: { id: session?.user?.id },
  });
  if (!session) {
    return (
      <Button asChild>
        <Link href="/sign-in">
          <UserIcon /> Sign In
        </Link>
      </Button>
    );
  }
  const firstLetterOfName = session.user?.name?.charAt(0).toUpperCase() || "U";
  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative ml-2 w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center"
            >
              {firstLetterOfName}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 " align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="font-medium text-sm leading-none">
                {session.user?.name}
              </div>
              <div className="text-sm text-muted-foreground leading-none">
                {session.user?.email}
              </div>
              {user?.role === "admin" && (
                <div className="flex justify-between flex-wrap">
                  <div>
                    <Link
                      href="/admin/insertproduct"
                      className="text-sm leading-none link"
                    >
                      <Button variant="outline" className="">
                        Add Product
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/admin/allproduct"
                      className="text-sm leading-none link"
                    >
                      <Button variant="ghost">All Products</Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="p-0 mb-1">
            <div>
              <form action={signOutUser} className="w-full">
                <Button
                  type="submit"
                  variant="ghost"
                  className="w-full py-4 px-2 h-4 justify-start"
                >
                  Sign Out
                </Button>
              </form>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserButton;
