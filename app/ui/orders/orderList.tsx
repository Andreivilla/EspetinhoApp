'use client';
//import { Button } from './buttons';
import { FinalizarPedidoModal } from './buttonsClient';
import { useState } from 'react';

export default function OrderList({ 
  products,
  nTables
}: Readonly<{ 
  products: any[],
  nTables: number, 
}>) {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  function handleQuantityChange(productId: number, value: number) {
    if (value === 0 && productId in quantities){
      setQuantities((prev) => {
        const del = { ...prev };
        delete del[productId];
        return del;
      });
    }else{
      setQuantities((prev) => ({...prev, [productId]: value}));
    }
  }

  return (
    <>
      <div className="mt-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <select
            id="mesa"
            className="border rounded px-3 py-2"
            value={selectedTable ?? ''}
            onChange={(e) => setSelectedTable(Number(e.target.value))}
          >
            <option value="">Mesa</option>
            {[new Array(nTables)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Mesa {i + 1}
              </option>
            ))}
          </select>
        </div>
        <FinalizarPedidoModal quantities={quantities} selectedTable={selectedTable}/>
        {/*
        <Button quantities={quantities} selectedTable={selectedTable} />*/}
        
      </div>

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
              <option key={`${i}`} value={i}>
                {`${i}`}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
    </>
  );
}
