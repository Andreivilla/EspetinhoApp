'use client'
import { useState } from "react";
import { SubmitOrder } from "./buttons";

import { ProdutoSelect } from "@/app/lib/definitions";

export default function CheckOrder({ 
    productSelected,
    quantities, 
    selectedTable 
}: Readonly <{
    productSelected: ProdutoSelect[];
    quantities: Record<number, number>;
    selectedTable: number | null;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}
        className="rounded-md border p-2 bg-black
        text-white flex align-center justify-center
        hover:bg-gray-800 w-full"
      >
        Finalizar Pedido
        Continuar
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <div className="flex flex-col gap-2 justify-center">
              {productSelected?.map((product) => (
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

                <h1>{product.quantitie}</h1>
              </div>
            ))}
          </div>
          
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-2 bg-gray-200 text-black 
              flex align-center justify-center w-full mb-2"
            >
              Fechar
            </button>
            <SubmitOrder quantities={quantities} selectedTable={selectedTable}/>
          </div>
        </div>        
      )}
    </>
  );
}