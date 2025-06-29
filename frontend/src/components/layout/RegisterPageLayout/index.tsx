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
import { CountrySelector } from '@/components/core/CountrySelector';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '@/hooks/use-register';
import {
  type RegisterFormData,
  registerSchema,
} from '@/validations/auth/register';
import { useState } from 'react';

export default function RegisterPageLayout() {
  const registerMutation = useRegister();
  const [countryCode, setCountryCode] = useState('+55');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  const phoneNumber = watch('phone');

  const handlePhoneChange = (value: string) => {
    // Remove any non-digit characters except the + at the beginning
    const cleanValue = value.replace(/[^\d]/g, '');
    const formattedPhone = countryCode + cleanValue;
    setValue('phone', formattedPhone);
  };

  const handleCountryChange = (newCountryCode: string) => {
    setCountryCode(newCountryCode);
    // Update the phone number with new country code
    const currentPhone = phoneNumber?.replace(/^\+\d{1,4}/, '') || '';
    setValue('phone', newCountryCode + currentPhone);
  };

  const displayPhoneNumber = phoneNumber?.replace(countryCode, '') || '';

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50 sm:flex sm:items-center sm:justify-center sm:p-4">
      {/* Mobile Layout */}
      <div className="min-h-screen flex flex-col justify-center px-6 py-12 sm:hidden">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Cadastro
            </h1>
            <p className="mt-2 text-gray-600">Crie sua conta</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label
                htmlFor="mobile-name"
                className="block text-sm font-medium text-gray-900"
              >
                Nome completo
              </Label>
              <div className="mt-2">
                <Input
                  {...register('name')}
                  id="mobile-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Insira seu nome completo"
                  className="h-12 text-base"
                  onChange={(e) => setValue('name', e.target.value)}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

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
                  onChange={(e) => setValue('email', e.target.value)}
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
                htmlFor="mobile-phone"
                className="block text-sm font-medium text-gray-900"
              >
                Telefone
              </Label>
              <div className="mt-2 flex gap-2">
                <CountrySelector
                  value={countryCode}
                  onValueChange={handleCountryChange}
                  className="h-12 px-3"
                />
                <Input
                  id="mobile-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="19999999999"
                  value={displayPhoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className="h-12 text-base flex-1"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
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
                  autoComplete="new-password"
                  placeholder="Insira sua senha"
                  className="h-12 text-base"
                  onChange={(e) => setValue('password', e.target.value)}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {registerMutation.error && (
              <div className="text-sm text-red-600 text-center">
                {registerMutation.error.message}
              </div>
            )}

            <div className="space-y-4">
              <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full h-12 text-base font-semibold cursor-pointer"
              >
                {registerMutation.isPending ? (
                  <>Criando conta...</>
                ) : (
                  'Criar conta'
                )}
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
                  Já tem uma conta?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="w-full h-12 text-base bg-transparent"
                >
                  Fazer login
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
            Cadastro
          </CardTitle>
          <CardDescription className="text-center">
            Crie sua conta para começar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="desktop-name">Nome completo</Label>
              <Input
                {...register('name')}
                id="desktop-name"
                type="text"
                placeholder="Insira seu nome completo"
                className="h-11"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

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
              <Label htmlFor="desktop-phone">Telefone</Label>
              <div className="flex gap-2">
                <CountrySelector
                  value={countryCode}
                  onValueChange={handleCountryChange}
                  className="h-11 px-3"
                />
                <Input
                  id="desktop-phone"
                  type="tel"
                  placeholder="19999999999"
                  value={displayPhoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className="h-11 flex-1"
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
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

            {registerMutation.error && (
              <div className="text-sm text-red-600 text-center">
                {registerMutation.error.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full h-11 cursor-pointer"
            >
              {registerMutation.isPending ? (
                <>Criando conta...</>
              ) : (
                'Criar conta'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Separator />
          <div className="text-center text-sm">
            {'Já tem uma conta? '}
            <Link href={'/login'}>
              <Button
                variant="link"
                className="px-0 font-normal cursor-pointer"
              >
                Fazer login
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
