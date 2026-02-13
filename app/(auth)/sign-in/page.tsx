import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

function signIn() {
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
            </CardContent>
        </Card>
    </div>
  )
}

export default signIn