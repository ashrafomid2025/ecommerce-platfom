import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignUpForm from "@/components/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
};
export default async function SignUp() {
  const session = await auth();
  if (session) {
    return redirect("/");
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="w-full flex justify-center">
            <Image
              src="images/logo.svg"
              alt={APP_NAME}
              height={100}
              width={100}
            />
          </Link>
          <CardTitle className="text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Insert the information below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
