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
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Package } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateProduct } from '@/hooks/use-create-product';
import {
  CreateProductFormData,
  createProductSchema,
} from '@/validations/product';

export default function RegisterProductLayout() {
  const createProductMutation = useCreateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      imageUrl: '',
    },
  });

  const onSubmit = (data: CreateProductFormData) => {
    // Convert string inputs to numbers for price and stock
    const formattedData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      description: data.description || undefined,
      imageUrl: data.imageUrl || undefined,
    };
    createProductMutation.mutate(formattedData);
  };

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50">
      {/* Mobile Layout */}
      <div className="sm:hidden">
        <div className="px-6 py-8">
          {/* Mobile Header */}
          <div className="flex items-center mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2 mr-3">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Cadastrar Produto
              </h1>
              <p className="text-gray-600">Adicione um novo produto</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label
                htmlFor="mobile-name"
                className="block text-sm font-medium text-gray-900"
              >
                Nome do produto *
              </Label>
              <div className="mt-2">
                <Input
                  {...register('name')}
                  id="mobile-name"
                  type="text"
                  placeholder="Digite o nome do produto"
                  className="h-12 text-base"
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
                htmlFor="mobile-description"
                className="block text-sm font-medium text-gray-900"
              >
                Descrição
              </Label>
              <div className="mt-2">
                <Textarea
                  {...register('description')}
                  id="mobile-description"
                  placeholder="Descreva o produto (opcional)"
                  className="min-h-[100px] text-base resize-none"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="mobile-price"
                  className="block text-sm font-medium text-gray-900"
                >
                  Preço (R$) *
                </Label>
                <div className="mt-2">
                  <Input
                    {...register('price', { valueAsNumber: true })}
                    id="mobile-price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0,00"
                    className="h-12 text-base"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label
                  htmlFor="mobile-stock"
                  className="block text-sm font-medium text-gray-900"
                >
                  Estoque *
                </Label>
                <div className="mt-2">
                  <Input
                    {...register('stock', { valueAsNumber: true })}
                    id="mobile-stock"
                    type="number"
                    min="0"
                    placeholder="0"
                    className="h-12 text-base"
                  />
                  {errors.stock && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label
                htmlFor="mobile-imageUrl"
                className="block text-sm font-medium text-gray-900"
              >
                URL da imagem
              </Label>
              <div className="mt-2">
                <Input
                  {...register('imageUrl')}
                  id="mobile-imageUrl"
                  type="url"
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="h-12 text-base"
                />
                {errors.imageUrl && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>
            </div>

            {createProductMutation.error && (
              <div className="text-sm text-red-600 text-center">
                {createProductMutation.error.message}
              </div>
            )}

            <div className="space-y-4 pt-4">
              <Button
                type="submit"
                disabled={createProductMutation.isPending}
                className="w-full h-12 text-base font-semibold"
              >
                {createProductMutation.isPending ? (
                  <>Criando produto...</>
                ) : (
                  <>
                    <Package className="mr-2 h-5 w-5" />
                    Criar produto
                  </>
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
                <span className="bg-white px-2 text-gray-500">Ou</span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full h-12 text-base bg-transparent"
                >
                  Voltar para produtos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Desktop Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900">
                Produtos
              </Link>
              <span>/</span>
              <span className="text-gray-900">Cadastrar produto</span>
            </nav>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <Package className="h-6 w-6" />
                Cadastrar Produto
              </CardTitle>
              <CardDescription className="text-center">
                Adicione um novo produto ao seu catálogo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="desktop-name">
                    Nome do produto <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('name')}
                    id="desktop-name"
                    type="text"
                    placeholder="Digite o nome do produto"
                    className="h-11"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desktop-description">Descrição</Label>
                  <Textarea
                    {...register('description')}
                    id="desktop-description"
                    placeholder="Descreva o produto (opcional)"
                    className="min-h-[120px] resize-none"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="desktop-price">
                      Preço (R$) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register('price', { valueAsNumber: true })}
                      id="desktop-price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0,00"
                      className="h-11"
                    />
                    {errors.price && (
                      <p className="text-sm text-red-600">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="desktop-stock">
                      Estoque <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register('stock', { valueAsNumber: true })}
                      id="desktop-stock"
                      type="number"
                      min="0"
                      placeholder="0"
                      className="h-11"
                    />
                    {errors.stock && (
                      <p className="text-sm text-red-600">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desktop-imageUrl">URL da imagem</Label>
                  <Input
                    {...register('imageUrl')}
                    id="desktop-imageUrl"
                    type="url"
                    placeholder="https://exemplo.com/imagem.jpg"
                    className="h-11"
                  />
                  {errors.imageUrl && (
                    <p className="text-sm text-red-600">
                      {errors.imageUrl.message}
                    </p>
                  )}
                </div>

                {createProductMutation.error && (
                  <div className="text-sm text-red-600 text-center">
                    {createProductMutation.error.message}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={createProductMutation.isPending}
                  className="w-full h-11 font-semibold"
                >
                  {createProductMutation.isPending ? (
                    <>Criando produto...</>
                  ) : (
                    <>
                      <Package className="mr-2 h-4 w-4" />
                      Criar produto
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Separator />
              <div className="text-center text-sm">
                <Link href="/">
                  <Button variant="link" className="px-0 font-normal">
                    Voltar para produtos
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
