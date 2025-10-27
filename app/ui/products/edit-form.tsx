'use client';
import { useState, useEffect, useActionState } from 'react';
import { updateProduct, State } from '@/app/lib/product/actions';
import Link from 'next/link';
import { Produto } from '@/app/lib/definitions';

export default function Form({ 
  product 
}: Readonly<{ 
  product: Produto 
}>) {
  const [name, setName] = useState(product.nome);
  const [price, setPrice] = useState(product.valor);

  const initialState: State = { message: null, errors: {} };
  const updateProductWithId = updateProduct.bind(null, product.id);
  const [, formAction] = useActionState(updateProductWithId, initialState);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!product.imagem || preview) return;

    if (product.imagem.startsWith('http') || product.imagem.startsWith('/')) {
      setPreview(product.imagem); // URL normal
    } else {
      setPreview(`data:image/jpeg;base64,${product.imagem}`); 
    }
  }, [product.imagem, preview]);

  useEffect(() => {
    if (!product.imagem) {
      setPreview(null);
      return;
    }
    if (file) return;

    if (product.imagem.startsWith('http') || product.imagem.startsWith('/')) {
      setPreview(`${product.imagem}?cacheBust=${Date.now()}`);
    } else {
      setPreview(`data:image/jpeg;base64,${product.imagem}`);
    }
  }, [product.imagem, file]);


  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      const selected = e.dataTransfer.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Editar Produto</h2>

      <form action={formAction}>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none border-3 focus:border-black peer block w-full rounded-md border-gray-200 py-2 pl-2 text-sm"
          />
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="outline-none border-3 focus:border-black peer block w-full rounded-md border-gray-200 py-2 pl-2 text-sm"
          />
        </div>

        <div className="flex flex-col items-center my-4">
          <label
            htmlFor="fileInput"
            className={`flex flex-col items-center justify-center w-64 h-40 border-2 border-dashed rounded-xl cursor-pointer transition overflow-hidden
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-blue-50 hover:border-blue-400'}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {preview ? (
              <img 
                src={preview} 
                alt="Preview" 
                className="object-cover w-full h-full" 
              />
            ) : (
              <>
                <svg
                  className="w-10 h-10 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 15a4 4 0 0 0 4 4h10a4 4 0 0 0 0-8h-1.26a8 8 0 1 0-14.42 4z"
                  />
                </svg>
                <span className="text-sm text-gray-600 text-center px-2">
                  Arraste e solte um arquivo ou clique aqui
                </span>
              </>
            )}
          </label>

          <input
            id="fileInput"
            name="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />

          {file && (
            <button
              onClick={removeFile}
              type="button"
              className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              Remover imagem
            </button>
          )}
        </div>

        <div className="w-full flex flex-col gap-2">
          <Link
            href={`/stock-manager/products/`}
            className="flex items-center justify-center bg-gray-200 text-black px-4 py-2 rounded h-14 text-xl"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded h-14 text-xl cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
