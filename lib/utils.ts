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
    const messages = error.issues.map((er: any) => er.message);
    return messages;
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    return "Email has already been taken";
  } else {
    return "Please check your internet connection and try again";
  }
}

// 90
export function round2(value: number | string) {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("The price is not string or number");
  }
}
