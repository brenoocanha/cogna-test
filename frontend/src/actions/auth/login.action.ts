/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import config from '@/config';
import constants from '@/consts';
import { getApiUrl } from '@/lib/utils';
import { LoginFormData } from '@/validations/auth/login';

export async function loginAction(
  form: LoginFormData
): Promise<LoginActionResponse> {
  const apiUrl = getApiUrl();
  const {
    API_ENDPOINTS: { login: loginUrl },
  } = constants;
  const { baseRequestHeaders: headers } = config;

  try {
    const res = await fetch(apiUrl + loginUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Ocorreu um erro ao tentar fazer login.');
    }
    return data;
  } catch (error: any) {
    return {
      error: error.message || 'Ocorreu um erro ao tentar fazer login.',
    } as any;
  }
}

export interface LoginActionParams {
  email: string;
  password: string;
}

export interface LoginActionResponse {
  token: string;
  refresh_token: string;
  last_login: string;
}
