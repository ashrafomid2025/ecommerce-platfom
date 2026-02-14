"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInUsersWithCredentials } from "@/lib/action/auth.action";
import { signInDefaultValue } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
const SignInButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-full" variant="default">
      {pending ? "Signing In..." : "Sign In"}
    </Button>
  );
};
function CredentialSignInForm() {
  const [data, action] = useActionState(signInUsersWithCredentials, {
    success: false,
    message: "",
  });

  return (
    <form action={action}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={signInDefaultValue.email}
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            defaultValue={signInDefaultValue.password}
            autoComplete="password"
          />
        </div>
        <div>
          <SignInButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/sign-up" className="link">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
}

export default CredentialSignInForm;
