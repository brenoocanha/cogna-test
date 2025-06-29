'use client';

import actions from '@/actions';
import constants from '@/consts';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useLogin() {
  const {
    auth: { loginAction: mutationFn },
  } = actions;
  const { AUTH_TOKEN_COOKIE_NAME, AUTH_REFRESH_TOKEN_COOKIE_NAME } = constants;
  const router = useRouter();

  return useMutation({
    mutationFn,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }
      const expires2h = new Date(Date.now() + 2 * 60 * 60 * 1000).toUTCString();
      const expires2d = new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000
      ).toUTCString();
      document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=${data.token}; path=/; secure; samesite=strict; expires=${expires2h}`;
      document.cookie = `${AUTH_REFRESH_TOKEN_COOKIE_NAME}=${data.refresh_token}; path=/; secure; samesite=strict; expires=${expires2d}`;
      toast.success('Login realizado com sucesso!');
      router.push('/');
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao acessar a conta'
      );
    },
  });
}
