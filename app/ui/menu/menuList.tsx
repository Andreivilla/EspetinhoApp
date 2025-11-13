'use client';
import { useState, useEffect } from 'react';
import { Produto } from '@/app/lib/definitions';
import Image from 'next/image';
import { RemoverMenu } from '../products/buttons';

export default function MenuList({ 
  products,
}: Readonly<{ 
  products: Produto[],
}>) {

  const [cacheBust, setCacheBust] = useState('');
  useEffect(() => {
    setCacheBust(`?cacheBust=${Date.now()}`);
  }, []);

  return (
  <div className="flex flex-col gap-2 justify-center">
    {products?.map((product) => (
      <div
        key={product.id}
        className="bg-white w-full shadow-md rounded-lg p-4 flex items-center justify-between"
      >
       
        <div className="flex items-center gap-4">
          {product.imagem ? (
            <div className="w-20 h-20 overflow-hidden rounded">
              <Image
                src={`${product.imagem}${cacheBust}`}
                alt={product.nome ?? "produto"}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-20 h-20 bg-gray-200 text-gray-500 rounded">
              Sem imagem
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-gray-800">{product.nome}</h3>
            <p className="text-gray-500 font-bold">R$ {product.valor.toFixed(2)}</p>
          </div>
        </div>

        <RemoverMenu id={String(product.id)} redirectPath='/stock-manager/menu'/>
      </div>
    ))}
  </div>
  );
}
