import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./lib/db/lib";
import { email } from "zod";
import { compareSync } from "bcrypt-ts-edge";
import { id } from "zod/v4/locales";
export const setting ={
            pages: {
                signIn: '/sin-in',
                error: '/sin-in'
            },
            session: {
                strategy: "jwt",
                maxAge: 30 * 24 * 60 * 60, // 30 days
            },
            adapter: PrismaAdapter(prisma),
            providers: [CredentialsProvider({
                credentials:{
                    email : {type: 'email'},
                password: {type: 'password'}
                },
                 async authorize(credentials:any){
                if(credentials === null) return null;
                const user= await prisma.user.findFirst({
                    where: {email: credentials.email as string},
                })
                if(user && user.password){
                    const isMatch = compareSync(credentials.password as string, user.password);
                    if(isMatch){
                        return{
                            id: user.id,
                            name : user.name,
                            email: user.email,
                            role: user.role
                        }
                    }
                }
                return null;
            }
     })],
     callbacks: {
        async session({session,user,trigger,token}:any){
            session.user.id = token.sub;
            return session;
        }
     }
           
}satisfies NextAuthConfig;   
export const {handler, auth, signIn , sinOut} = NextAuth(setting);