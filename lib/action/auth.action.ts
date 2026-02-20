"use server"
import { authValidationScema, signUpUserValidet } from "../validator";
import { signIn, signOut , auth } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "../db/lib";
import { formatError } from "../utils";
export async function signUpuser(prevState:unknown , formData:FormData){
    try{
        const user = signUpUserValidet.parse({
        name: formData.get('name'),
        email:formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });
    const passwordEncrept = hashSync(user.confirmPassword , 10);
    await prisma.user.create({
        data:{
            name: user.name,
            email: user.email,
            password: passwordEncrept,
        },
    });
    await signIn("credentials", {
        email: user.email,
        password: user.password,
    });
    return {success: true , message: "user created and sign in successfully"}
    }
    
    catch(err){
        if(isRedirectError(err)){
            throw err;
        }
        return {
            success: false ,
            message: formatError(err),
        }
    }
}
// function sign up endded
// function sign in start
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
    await signOut();
}