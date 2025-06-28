'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import hooks from '@/hooks';
import validations from '@/validations';
import { LoginFormData } from '@/validations/auth/login';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function LoginPageLayout() {
  const {
    auth: { useLogin },
  } = hooks;
  const { loginSchema } = validations;
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50 sm:flex sm:items-center sm:justify-center sm:p-4">
      {/* Mobile Layout */}
      <div className="min-h-screen flex flex-col justify-center px-6 py-12 sm:hidden">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Login
            </h1>
            <p className="mt-2 text-gray-600">Acesso a sua conta</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label
                htmlFor="mobile-email"
                className="block text-sm font-medium text-gray-900"
              >
                Email
              </Label>
              <div className="mt-2">
                <Input
                  {...register('email')}
                  id="mobile-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Insira seu email"
                  className="h-12 text-base"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label
                htmlFor="mobile-password"
                className="block text-sm font-medium text-gray-900"
              >
                Senha
              </Label>
              <div className="mt-2">
                <Input
                  {...register('password')}
                  id="mobile-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Insira sua senha"
                  className="h-12 text-base"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Button
                  type="button"
                  variant="link"
                  className="px-0 text-blue-600 hover:text-blue-500"
                >
                  Esqueci minha senha
                </Button>
              </div>
            </div>

            {loginMutation.error && (
              <div className="text-sm text-red-600 text-center">
                {loginMutation.error.message}
              </div>
            )}

            <div className="space-y-4">
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full h-12 text-base font-semibold"
              >
                {loginMutation.isPending ? <>Acessando...</> : 'Acessar'}
              </Button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Novo na plataforma?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/cadastro">
                <Button
                  variant="outline"
                  className="w-full h-12 text-base bg-transparent"
                >
                  Criar uma conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <Card className="hidden sm:block w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Insira suas credenciais para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="desktop-email">Email</Label>
              <Input
                {...register('email')}
                id="desktop-email"
                type="email"
                placeholder="Insira seu email"
                className="h-11"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="desktop-password">Senha</Label>
              <Input
                {...register('password')}
                id="desktop-password"
                type="password"
                placeholder="Insira sua senha"
                className="h-11"
              />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Button type="button" variant="link" className="px-0 font-normal">
                Esqueci minha senha
              </Button>
            </div>

            {loginMutation.error && (
              <div className="text-sm text-red-600 text-center">
                {loginMutation.error.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full h-11"
            >
              {loginMutation.isPending ? <>Acessando...</> : 'Acessar'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Separator />
          <div className="text-center text-sm">
            {'Ainda não tem uma conta? '}
            <Link href={'/cadastro'}>
              <Button
                variant="link"
                className="px-0 font-normal cursor-pointer"
              >
                Registrar-se
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
