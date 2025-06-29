'use server';

import constants from '@/consts';
import { cookies } from 'next/headers';

const { AUTH_TOKEN_COOKIE_NAME, AUTH_REFRESH_TOKEN_COOKIE_NAME } = constants;

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE_NAME);
  return !!token?.value;
}

export async function requireAuth() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    throw new Error('Authentication required');
  }
}

export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_TOKEN_COOKIE_NAME)?.value;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_TOKEN_COOKIE_NAME);
  cookieStore.delete(AUTH_REFRESH_TOKEN_COOKIE_NAME);
}
