import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Product } from '@/types';

interface ProductPageProps {
  params: {
    id: Product['id'];
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  console.log('Fetching product with ID:', params.id);
  const product = await fetchProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50">
      {/* Mobile Layout */}
      <div className="sm:hidden">
        <div className="px-6 py-8">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/products">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="p-2">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Product Image */}
          <div className="mb-6">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.imageUrl || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Mobile Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">
                    4.8 (124 avaliações)
                  </span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-gray-900 mb-4">
                R$ {product.price}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Descrição</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Mobile Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="h-5 w-5 text-green-600" />
                <span>Frete grátis para todo o Brasil</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Garantia de 1 ano</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <RotateCcw className="h-5 w-5 text-purple-600" />
                <span>Devolução em até 30 dias</span>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="space-y-3 pt-4">
              <Button className="w-full h-12 text-base font-semibold">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Adicionar ao carrinho
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 text-base bg-transparent"
              >
                Comprar agora
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Desktop Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900">
                Produtos
              </Link>
              <span>/</span>
              <span className="text-gray-900">{product.name}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Desktop Product Image */}
            <div>
              <Card className="overflow-hidden py-0">
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={product.imageUrl || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </Card>
            </div>

            {/* Desktop Product Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-3xl">{product.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <span className="text-sm text-gray-600">
                      4.8 (124 avaliações)
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-gray-900 mb-6">
                    R$ {product.price}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Truck className="h-5 w-5 text-green-600" />
                      <span>Frete grátis para todo o Brasil</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span>Garantia de 1 ano</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <RotateCcw className="h-5 w-5 text-purple-600" />
                      <span>Devolução em até 30 dias</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full h-11 font-semibold">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Adicionar ao carrinho
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-11 bg-transparent"
                    >
                      Comprar agora
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Desktop Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Descrição do produto</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function fetchProduct(id: string): Promise<Product | null> {
  'use server';

  const { getProductByIdAction } = await import(
    '@/actions/get-product-by-id.action'
  );
  return getProductByIdAction(id);
}
