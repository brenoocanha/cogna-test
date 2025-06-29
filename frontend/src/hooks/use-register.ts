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
    onSuccess: () => {
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
