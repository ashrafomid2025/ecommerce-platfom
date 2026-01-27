"use client";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import React from "react";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-1">
      <Image
        src="/images/logo.svg"
        alt={`${APP_NAME} logo`}
        width={48}
        height={48}
      />
      <div className="p-6 text-center rounded-lg shadow-md">
        <h1 className="text-3xl-bold-bold">Not Found</h1>
        <p className="text-destructive">Could not found the requested page</p>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
