"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { authValidationSchema, signUpValidationSchema } from "../validator";
import { hashSync } from "bcrypt-ts-edge";
import { signIn, signOut } from "@/auth";
import { prisma } from "../db/lib";
import { formatError } from "../utils";

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpValidationSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    const passwordEncrype = hashSync(user.confirmPassword, 10);
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: passwordEncrype,
      },
    });
    await signIn("credentials", {
      email: user.email,
      password: user.confirmPassword,
      redirect: true,
    });
    return {
      success: true,
      message: "user created and signed in successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function signInUsersWithCredentials(
  prevState: unknown,
  formData: FormData,
) {
  try {
    const user = authValidationSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: true,
    });
    return { success: true, message: "user logged in successfully" };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    return { success: false, message: "Invalid email or password" };
  }
}
// actionstate
export async function signOutUser() {
  await signOut();
}
