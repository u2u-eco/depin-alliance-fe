import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function genIdFromString(input: string) {
  const cleanedId = input.replace(/\W/g, '_')
  return cleanedId.toLowerCase()
}
