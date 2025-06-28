'use server';

import config from '@/config';
import constants from '@/consts';
import { getApiUrl } from '@/lib/utils';
import { LoginFormData } from '@/validations/auth/login';

export async function loginAction(form: LoginFormData) {
  const apiUrl = getApiUrl();
  const {
    API_ENDPOINTS: { login: loginUrl },
  } = constants;
  const { baseRequestHeaders: headers } = config;

  console.log('A', apiUrl + loginUrl);
  const res = await fetch(apiUrl + loginUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Ocorreu um erro ao tentar fazer login.');
    // throw new Error(data.message || 'Ocorreu um erro ao tentar fazer login.');
  }
  return data;
}
