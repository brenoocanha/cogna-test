'use client';

import actions from '@/actions';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateProduct() {
  const {
    product: { createProductAction: mutationFn },
  } = actions;

  return useMutation({
    mutationFn,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }
      toast.success('Produto cadastrado com sucesso!');
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao efetuar registro.'
      );
    },
  });
}
