'use client';

import { useRouter } from 'next/navigation';

export default function ProductCard({ product }) {
  const router = useRouter();

  return (
    <div className="border p-4 rounded">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <button
        onClick={() => router.push(`/products/${product.id}/edit`)}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Editar
      </button>
    </div>
  );
}
