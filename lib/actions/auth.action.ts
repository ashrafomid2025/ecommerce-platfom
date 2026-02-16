import { signIn, signOut } from "@/auth";
import { authValidationSchema } from "../validator";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signInUsersWithCredentials(prevstate : unknown, formData: FormData){
    try{
        const user = authValidationSchema.parse({
            email: formData.get("email"),
            password: formData.get("password")
        });
        await signIn("credentials",{
            email: user.email,
            password: user.password,
            redirect: false
        });
        return {success: true, message: 'user logged in successfully'}
    }
    catch(err){
        if(isRedirectError(err)) throw err;
        return {success: false, message: 'Invalid email or password'}
    }
}

// action state
export async function signOutUser(){
    await signOut();
}