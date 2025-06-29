'use server';

import config from '@/config';
import constants from '@/consts';
import { getAuthToken } from '@/lib/server/utils';
import { getApiUrl } from '@/lib/utils';
import { Product } from '@/types';

export async function getProductByIdAction(
  id: Product['id']
): Promise<Product> {
  const apiUrl = getApiUrl();
  const {
    API_ENDPOINTS: { productById: productByIdUrl },
  } = constants;
  const { baseRequestHeaders } = config;

  const token = await getAuthToken();
  console.log('AAAA', apiUrl + productByIdUrl(id));

  const res = await fetch(apiUrl + productByIdUrl(id), {
    method: 'GET',
    headers: {
      ...baseRequestHeaders,
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Ocorreu um erro ao buscar pelo produto.');
  }
  return data;
}
