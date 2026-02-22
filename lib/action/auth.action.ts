"use server"
import { authValidationScema, productInsertSchema, signUpUserValidet } from "../validator";
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
            redirect: true,
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
// function Sign Out end
// function Insert Product

export async function InsertProduct(prevState: unknown , formData : FormData){
    try{
        const ProductInsert = productInsertSchema.parse({
            name: formData.get("name"),
            slug: formData.get("slug"),
            category: formData.get("category"),
            description: formData.get("description"),
            brand: formData.get("brand"),
            banner: formData.get("banner"),
            stock: formData.get("stock"),
            isFeacherd: formData.get("isFeacherd"),
        });
        await prisma.ecommerePlatform.create({
            data:{
                name: ProductInsert.name,
                slug: ProductInsert.slug,
                category: ProductInsert.category,
                description: ProductInsert.description,
                brand: ProductInsert.brand,
                banner: ProductInsert.banner,
                stock: ProductInsert.stock,
                isFeatured: ProductInsert.isFeacherd,
            },
        });
    }
    catch(err){
        return err;
    }
}