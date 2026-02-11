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

export default function Login() {
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
          <CardTitle className="text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Sign In with email and password
          </CardDescription>
        </CardHeader>
        <CardContent>{/* input */}</CardContent>
      </Card>
    </div>
  );
}
