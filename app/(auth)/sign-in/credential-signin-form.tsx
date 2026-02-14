import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValue } from "@/lib/constants";
import Link from "next/link";
import React from "react";

function CredentialSignInForm() {
  return (
    <form>
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
          <Button variant="default" className="w-full">
            Sign In
          </Button>
        </div>
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
