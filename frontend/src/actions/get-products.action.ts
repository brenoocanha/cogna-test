'use server';

import config from '@/config';
import constants from '@/consts';
import { getAuthToken } from '@/lib/server/utils';
import { getApiUrl } from '@/lib/utils';
import { Product } from '@/types';

export async function getProductsAction(): Promise<Product[]> {
  const apiUrl = getApiUrl();
  const {
    API_ENDPOINTS: { products: productsUrl },
  } = constants;
  const { baseRequestHeaders } = config;

  const token = await getAuthToken();

  const res = await fetch(apiUrl + productsUrl, {
    method: 'GET',
    headers: {
      ...baseRequestHeaders,
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Ocorreu um erro ao buscar os produtos.');
  }
  return data;
}
