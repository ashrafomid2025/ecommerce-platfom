import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// tailwind merge, tailwind variant
// 5btn, info, danger, success
// admin, user, header,footer
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
export function priceConverter(value: number): string {
  const priceString = value.toString();

  const [int, float] = priceString.split(".");
  return float ? `${int}.${float.padEnd(2, "0")}` : `${int}.'00`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (error.name === "ZodError") {
    const fieldErrors = error.issues.map((err: any) => err.message);
    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    const field = "Email already have been used";
    return field;
    // prisma error
  } else {
    // handle other error
    return "Something Went Wrong, please check your internet connection";
  }
}
