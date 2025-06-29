import type { Product } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer py-0 pb-4">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={product.imageUrl || '/placeholder.svg'}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <CardHeader className="py-2">
          <CardTitle className="text-lg sm:text-base font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-sm text-gray-600 line-clamp-2 mb-3">
            {product.description}
          </CardDescription>
          <div className="flex items-center justify-between">
            <p className="text-xl sm:text-lg font-bold text-gray-900">
              R$ {product.price}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
