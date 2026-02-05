import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// tailwind merge, tailwind variant
// 5btn, info, danger, success

export function convertToPlainObject<T>(value:T):T{
  return JSON.parse(JSON.stringify(value));
}

export function priceConverter(value:number):string{
  const priceString = value.toString();
  const [int,float] = priceString.split(".");
  return float? `${int}. ${float?float:float.padEnd(2,"0")}`: `${int}.00`; 
}
