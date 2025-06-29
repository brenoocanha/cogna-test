'use server';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/core/ProductCard';
import LogoutButton from '@/components/core/LogoutButton';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50">
      {/* Mobile Layout */}
      <div className="sm:hidden">
        <div className="px-6 py-8 relative">
          {/* Mobile Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Produtos
            </h1>
            <p className="mt-2 text-gray-600">Descubra nossos produtos</p>
          </div>
          <div className="absolute top-2 right-2">
            <LogoutButton logoutFn={logout} />
          </div>
          {products.length > 0 && (
            <div className="w-full flex justify-center mb-6">
              <Link href={'/products/registrar'} className="w-full">
                <Button className="w-full max-w-full cursor-pointer">
                  Cadastrar Produto
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Products Grid */}
          <div className="grid grid-cols-1 gap-6">
            {products.length > 0 &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          {products.length === 0 && (
            <>
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Nenhum produto encontrado
                </p>
              </div>
              <div className="w-full flex justify-center mb-6">
                <Link href={'/products/registrar'} className="w-full">
                  <Button className="w-full max-w-full cursor-pointer">
                    Cadastrar Produto
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Desktop Header */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative">
                <div>
                  <CardTitle className="text-3xl font-bold text-gray-900">
                    Produtos
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Descubra nossa coleção de produtos
                  </CardDescription>
                </div>
                <div className="absolute top-2 right-2">
                  <LogoutButton logoutFn={logout} />
                </div>
              </div>
            </CardHeader>
          </Card>
          {products.length > 0 && (
            <div className="w-full flex justify-center mb-6">
              <Link href={'/products/registrar'} className="w-full">
                <Button className="w-full max-w-full cursor-pointer flex">
                  Cadastrar Produto
                </Button>
              </Link>
            </div>
          )}

          {/* Desktop Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length > 0 &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          {products.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-500 text-lg">
                  Nenhum produto encontrado
                </p>
                <Link href={'/products/registrar'}>
                  <Button className="mt-4 cursor-pointer">
                    Cadastrar Produto
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

async function fetchProducts() {
  'use server';
  const { getProductsAction } = await import('@/actions/get-products.action');
  return getProductsAction();
}

async function logout() {
  'use server';
  const { logout } = await import('@/lib/server/utils');
  return logout().then(() => redirect('/login'));
}
