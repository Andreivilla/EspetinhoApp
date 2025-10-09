'use client'
import { useState } from "react";
import { DeleteProduct } from "./buttons";

export default function DeleteModal({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}
        className="rounded-md border p-2 bg-red-700
        text-white flex align-center justify-center
        hover:bg-gray-800"
      >
        Deletar Produto
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
            <h2 className="text-xl font-bold mb-2">Deletar Produto</h2>
            <p className="mb-4">Deseja realmente deletar o produto?</p>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-2 bg-gray-200 text-black 
              flex align-center justify-center w-full mb-2"
            >
              Fechar
            </button>
            <DeleteProduct id={id} />
          </div>
        </div>        
      )}
    </>
  );
}