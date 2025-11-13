'use client';
import { useState, useEffect } from 'react';
import { Produto, ProdutoSelect } from '@/app/lib/definitions';
import CheckOrder from './buttonsClient';
import Image from 'next/image';


export default function OrderList({ 
  products,
  nTables
}: Readonly<{ 
  products: Produto[],
  nTables: number, 
}>) {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [ produtoSelectList, setProdutoSelectList] = useState<ProdutoSelect[]>([]);

  const [cacheBust, setCacheBust] = useState('');
  useEffect(() => {
    setCacheBust(`?cacheBust=${Date.now()}`);
  }, []);

 function handleQuantityChange(productId: number, value: number) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (value === 0) {
      setQuantities(prev => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });

      setProdutoSelectList(prev => prev.filter(p => p.id !== productId));
    } else {
      setQuantities(prev => ({ ...prev, [productId]: value }));

      setProdutoSelectList(prev => {
        const existing = prev.find(p => p.id === productId);
        if (existing) {
          return prev.map(p =>
            p.id === productId ? { ...p, quantitie: value } : p
          );
        } else {
          return [
            ...prev,
            { ...product, quantitie: value }
          ];
        }
      });
    }
    console.log(produtoSelectList)
  }

  return (
    <>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center">
          <select
            id="mesa"
            className="border rounded px-3 py-2"
            value={selectedTable ?? ''}
            onChange={(e) => setSelectedTable(Number(e.target.value))}
          >
            <option value="">Mesa</option>
            {nTables > 0 &&
              Array.from({ length: nTables }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Mesa {i + 1}
                </option>
              ))
            }
          </select>
        </div>
        <CheckOrder productSelected={produtoSelectList} quantities={quantities} selectedTable={selectedTable}/>
        
      </div>

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

            <select
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={quantities[product.id] || 0}
              onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
            >
              {Array.from({ length: 30 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

    </>
  );
}
