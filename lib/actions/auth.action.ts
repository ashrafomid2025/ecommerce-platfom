import { signIn, signOut } from "@/auth";
import { authValidationSchema } from "../validator";
import { success } from "zod";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signInUsersWithCredentials(prevstate : unknown, formData: FormData){
    try{
        const user = authValidationSchema.parse({
            email: formData.get("email"),
            password: formData.get("password")
        });
        await signIn("credentials",user);
        return {success: true, message: 'user logged in successfully'}
    }
    catch(err){
        if(isRedirectError(err)) throw err;
        return {success: false, message: 'Invalid email'}
    }
}

// action state
export async function signOutUser(){
    await signOut();
}