import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block hover:shadow-lg transition-shadow duration-200"
    >
      <div className="bg-white shadow-md rounded-lg p-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={300}
          className="w-full h-48 object-cover rounded-lg"
        />
        <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <p className="text-lg font-bold mt-2">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
