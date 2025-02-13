import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const MAX_FREE_FORM: number = 3;
export const MAX_PRO_FORM: number = 3;
export const MAX_ENTERPRISE_FORM: number = 3;