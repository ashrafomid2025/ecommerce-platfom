import { auth } from "@/auth"
import LoginwithCredintal from "@/components/login-with-credintial"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
export const metadata: Metadata = {
    title: "Sign In"
}
async function signIn() {
    const session = await auth();
    if(session){
        redirect("/");
    }
  return (
    <div className="w-full max-w-md mx-auto">
        <Card>
            <CardHeader className=" space-y-4">
                <Link href="/" className="flex  justify-center">
                <Image src="images/logo.svg" alt="logo" height={100} width={100} />
                </Link>
                <CardTitle className="text-center">
                    LogIn
                </CardTitle>
                <CardDescription className="text-center">LogIn with Email And Password</CardDescription>
            </CardHeader>
            <CardContent>
                {/* input */}
            <LoginwithCredintal />
            </CardContent>
        </Card>
    </div>
  )
}

export default signIn