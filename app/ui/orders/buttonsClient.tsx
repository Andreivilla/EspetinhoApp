'use client'
import { useState, useEffect } from "react";
import { SubmitOrder, FinalizarPedido, CancelarPedido } from "./buttons";
import { Pedido, ProdutoSelect } from "@/app/lib/definitions";
import Image from "next/image";

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
    const [cacheBust, setCacheBust] = useState('');
    useEffect(() => {
      setCacheBust(`?cacheBust=${Date.now()}`);
    }, []);
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
                    <div className="w-20 h-20 overflow-hidden rounded">
                      <Image
                        src={`${product.imagem}${cacheBust}`}
                        alt={product.nome ?? "produto"}
                        width={80}
                        height={80}
                        className="object-cover"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
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
              Cancelar
            </button>
            <SubmitOrder quantities={quantities} selectedTable={selectedTable}/>
          </div>
        </div>        
      )}
    </>
  );
}

export function CheckOrderAdmin({
  pedido
}: Readonly <{
  pedido: Pedido
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const [cacheBust, setCacheBust] = useState('');
  useEffect(() => {
    setCacheBust(`?cacheBust=${Date.now()}`);
  }, []);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="w-full p-4 rounded-md shadow flex flex-col items-center ">
        <div className="grid grid-cols-3 w-full mb-2">
          <h2 className="text-left font-bold">Mesa {pedido.id_mesa}</h2>
          <p className="text-center">
            {new Date(pedido.data).toLocaleTimeString('pt-BR')}
          </p>
          
          <span className="text-right text-green-600">R$: {pedido.total}</span>
        </div>

        <div className="w-full border-t border-gray-300 mt-2 pt-2 text-sm text-start">
          <h3 className="text-gray-800">Itens: </h3>
          {pedido.itens?.map((item) => (
            <p className="text-gray-500" key={item.id_produto}>{item.produto?.nome}</p>
          ))}
        </div>
      </button>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>

              <div className="pt-4 pb-4 flex place-content-between">
                <h2 className="text-lg font-bold text-black text-left">Mesa: {pedido.id_mesa}</h2>
                <p className="text-sm text-gray-600 text-left">
                  {new Date(pedido.data).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <ul className="space-y-4">
                {pedido.itens?.map((item) => (
                  <li key={item.id} className="flex gap-2">
                    <div className="w-20 h-20 overflow-hidden rounded border border-gray-200">
                      <Image
                        src={`${item.produto?.imagem}${cacheBust}`}
                        alt={item.produto?.nome?? "produto"}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex place-content-between w-full">
                      <h3 className="text-black"> {item.produto?.nome}</h3>
                      <div className="items-center justify-center">
                        <span>{item.quantidade} X R$: {item.produto?.valor}</span>
                        <br />
                        <span>
                          Total: {item.produto?.valor ? item.quantidade * item.produto.valor : 0}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex place-content-between mt-2 text-xl font-bold">
                <h1>Total: </h1>
                <span>R$: {pedido.total}</span>
              </div>

              <div className="flex place-content-between mt-2 text-xl font-bold">
                <CalcelarModal id={pedido.id}/>
                <FinalizarModal id={pedido.id}/>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export function CalcelarModal({ 
  id 
}: Readonly <{ 
  id: number
}>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}
        className="rounded-md border p-2 bg-red-700
        text-white flex align-center justify-center w-full
        hover:bg-gray-800"
      >
        Cancelar Pedido
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
            <h2 className="text-xl font-bold mb-2">Cancelar Pedido</h2>
            <p className="mb-4">Deseja realmente Cancelar o Pedido?</p>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-2 bg-gray-200 text-black 
              flex align-center justify-center w-full mb-2"
            >
              Cancelar
            </button>
            <CancelarPedido id={id}/>
          </div>
        </div>        
      )}
    </>
  );
}

export function FinalizarModal({ 
  id 
}: Readonly <{ 
  id: number
}>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}
        className="rounded-md border p-2 bg-black
        text-white flex align-center justify-center w-full
        hover:bg-gray-800"
      >
        Finalizar Pedido
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 
              hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2">Finalizar Pedido</h2>
            <p className="mb-4">Deseja realmente Finalizar o Pedido?</p>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-2 bg-gray-200 text-black 
              flex align-center justify-center w-full mb-2"
            >
              Cancelar
            </button>
            <FinalizarPedido id={id}/>
          </div>
        </div>        
      )}
    </>
  );
}