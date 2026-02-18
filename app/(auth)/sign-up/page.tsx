import { auth } from "@/auth"
import SignUpUser from "@/components/SignUp"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
export const metadata: Metadata = {
    title: "Sign Up"
}
async function signUp() {
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
                    Sign Up
                </CardTitle>
                <CardDescription className="text-center">Insert The  Information below to Sign Up</CardDescription>
            </CardHeader>
            <CardContent>
                {/* input */}
            <SignUpUser />
            </CardContent>
        </Card>
    </div>
  )
}

export default signUp