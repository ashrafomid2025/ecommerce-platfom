"use client";
import React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { signInDefaultValue } from "@/lib/constants";
import { Button } from "./ui/button";
import { signInUsersWithCredentials } from "@/lib/action/auth.action";
import Link from "next/link";

function SignInButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending ? true : false}
      className="w-full"
      variant="default"
    >
      {pending ? "Signing In..." : "Sign In"}
    </Button>
  );
}

function SignInWithCredentialForm() {
  const [data, action] = useActionState(signInUsersWithCredentials, {
    success: false,
    message: "",
  });

  return (
    <form action={action}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            defaultValue={signInDefaultValue.email}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            autoComplete="password"
            defaultValue={signInDefaultValue.password}
          />
        </div>
        <div>
          <SignInButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
      </div>
      <div className="text-sm text-center text-foreground-muted">
        Don't have an account?{" "}
        <Link href="/sign-up" className="link">
          Sign up
        </Link>
      </div>
    </form>
  );
}

export default SignInWithCredentialForm;
