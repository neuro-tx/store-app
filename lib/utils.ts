import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractKey = (url: string) => {
  const imgUrl = url.split("/").reverse();
  return `${imgUrl[1]}/${imgUrl[0]}`;
};
