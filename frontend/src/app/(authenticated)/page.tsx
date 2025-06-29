'use server';

import CoreComponents from '@/components/core';

export default async function Home() {
  const products = await fetchProducts();
  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <section className="flex justify-center w-full">
          <h1 className="text-5xl text-center font-bold">Produtos</h1>
        </section>
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length > 0 &&
            products.map((product) => (
              <CoreComponents.ProductCard key={product.id} product={product} />
            ))}
        </section>
      </main>
    </div>
  );
}

async function fetchProducts() {
  'use server';

  const { getProductsAction } = await import('@/actions/get-products.action');
  return getProductsAction();
}
