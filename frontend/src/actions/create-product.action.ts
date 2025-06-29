/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import config from '@/config';
import constants from '@/consts';
import { getAuthToken } from '@/lib/server/utils';
import { getApiUrl } from '@/lib/utils';
import { Product } from '@/types';
import { CreateProductFormData } from '@/validations/product';

export async function createProductAction(
  form: CreateProductFormData
): Promise<Product[]> {
  const apiUrl = getApiUrl();
  const {
    API_ENDPOINTS: { createProduct: createProductUrl },
  } = constants;
  const { baseRequestHeaders } = config;

  const token = await getAuthToken();

  try {
    const res = await fetch(apiUrl + createProductUrl, {
      method: 'POST',
      headers: {
        ...baseRequestHeaders,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Ocorreu um erro ao buscar os produtos.');
    }
    return data;
  } catch (error: any) {
    return {
      error: error.message || 'Ocorreu um erro ao criar produto.',
    } as any;
  }
}
