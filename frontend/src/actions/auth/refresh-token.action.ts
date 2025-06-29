'use server';

import config from '@/config';
import constants from '@/consts';
import { getApiUrl } from '@/lib/utils';

export async function refreshTokenAction(refreshToken: string) {
  const { baseRequestHeaders: headers } = config;
  const apiUrl = getApiUrl();
  const {
    API_ENDPOINTS: { refreshToken: refreshTokenUrl },
  } = constants;
  const res = await fetch(apiUrl + refreshTokenUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      refreshToken,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      data.message || 'Ocorreu um erro ao tentar renovar o token.'
    );
  }

  return data;
}
