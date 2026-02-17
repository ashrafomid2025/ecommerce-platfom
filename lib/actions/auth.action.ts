"use server";
import { signIn, signOut } from "@/auth";
import { authValidationSchema, signUpValidationSchema } from "../validator";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "../db";
import { success } from "zod";

export async function signUpUser(prevstate: unknown, formData: FormData){
    try{
        const user = signUpValidationSchema.parse({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword")
        });
        const passwordEncrypted = hashSync(user.confirmPassword,10);
        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: passwordEncrypted
            }
        });
        await signIn("credentials",{
            email: user.email,
            password: user.confirmPassword,
            redirect: true
        });
        return {
            success: true,
            message: "user created and signed in successfully"
        }
    }
    catch(err){
        if(isRedirectError(err)){
                throw err;
        }
        return {
            success: false,
            message: "Something went wrong"
        };
    }
}

export async function signInUsersWithCredentials(prevstate : unknown, formData: FormData){
    try{
        const user = authValidationSchema.parse({
            email: formData.get("email"),
            password: formData.get("password")
        });
        await signIn("credentials",{
            email: user.email,
            password: user.password,
            redirect: true
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