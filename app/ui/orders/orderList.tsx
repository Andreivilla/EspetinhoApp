'use client';

import { useState } from 'react';

export default function OrderList({ 
  products 
}: Readonly<{ 
  products: any[] 
}>) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  function handleQuantityChange(productId: number, value: number) {
    setQuantities((prev) => ({ ...prev, [productId]: value }));
  }

  return (
    <div className="flex flex-col gap-2 justify-center">
      {products?.map((product) => (
        <div key={product.id} className="bg-white w-full shadow-md rounded-lg p-4 flex flex-row items-center justify-between">
          <div className="flex gap-2 justify-center">
            {product.imagem ? (
              <img className="object-cover w-20 h-20" src={product.imagem} alt={product.nome ?? "produto"} />
            ) : (
              <div className="flex items-center justify-center w-20 h-20 bg-gray-200 text-gray-500">
                Sem imagem
              </div>
            )}

            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-gray-800">{product.nome}</h3>
              <p className="text-gray-500 font-bold">R$ {product.valor.toFixed(2)}</p>
            </div>
          </div>

          <select
            className="border rounded px-3 py-2"
            value={quantities[product.id] || 0}
            onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
          >
            {Array.from({ length: 30 }, (_, i) => (
              <option key={String.fromCodePoint(97 + i)} value={i}>
                {String.fromCodePoint(97 + i)}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
