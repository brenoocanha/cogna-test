'use client';

import actions from '@/actions';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useRegister() {
  const {
    auth: { registerAction: mutationFn },
  } = actions;
  const router = useRouter();

  return useMutation({
    mutationFn,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }
      toast.success('Registro realizado com sucesso!');
      router.push('/login');
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao efetuar registro.'
      );
    },
  });
}
