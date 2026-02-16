"use server"
import { authValidationScema } from "../validator";
import { signIn, sinOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
export async function signInuserWithCredentiols(prevState:unknown , formData: FormData){
    try{
        const user = authValidationScema.parse({
            email: formData.get('email'),
            password: formData.get('password'),
        })
        await signIn('credentials' , {
            email: user.email,
            password: user.password,
            redirect: false,
        })
        return {success: true, message: 'user logged In successfuly'}
    }
    catch(err){
        if(isRedirectError(err)){
            throw err ;
        }
        return { success: false , message: 'Invalid email or password'}
    }
}
// 
export async function signOutuser(){
    await sinOut();
}