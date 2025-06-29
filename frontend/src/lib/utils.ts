import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) console.error('NEXT_PUBLIC_API_URL is not defined');
  return baseUrl?.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}
