'use client';
import { useState } from 'react';
import { createProduct, State } from '@/app/lib/actions';
import { useActionState } from 'react';
import Link from 'next/link';
export default function Form() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<string>(''); 
  const [description, setDescription] = useState('');

  const initialState: State = { message: null, errors: {} };
  
  const [state, formAction] = useActionState(createProduct, initialState);
//

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selected = e.dataTransfer.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

//
  return (
    <div className=''>
      <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>

      <form action={formAction}>
        <div className='flex flex-col gap-4'>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            className="outline-none border-3 focus:border-black 
              peer block w-full rounded-md border-gray-200 
              py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
          />
          <input
            type="text"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Preco"
            className="outline-none border-3 focus:border-black 
              peer block w-full rounded-md border-gray-200 
              py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
          />
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
            className="outline-none border-3 focus:border-black 
              peer block w-full h-40 rounded-md border-gray-200 
              p-2 text-sm placeholder:text-gray-500 resize-none"
          ></textarea>
        </div>

        {/* imagem */}
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
            {!preview ? (
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
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            )}
          </label>

          <input
            name="image"
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
          
          {file && (
            <button
              onClick={removeFile}
              className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              Remover imagem
            </button>
          )}
        </div>

        <div className='w-full flex flex-col gap-2'> 
          <Link
            href={`/stock-manager/products/`}
            className="flex items-center justify-center bg-gray-200 text-black px-4 py-2 rounded h-14 text-xl"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 
            rounded h-14 text-xl cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
/*
                  <div className="mb-6 mt-4">
  {preview ? (
    <div className="relative w-full h-48 border rounded overflow-hidden flex items-center justify-center bg-gray-100">
      <img
        src={preview}
        alt="Imagem selecionada"
        className="object-cover w-full h-full"
      />
      <button
        type="button"
        onClick={removeImage}
        className="absolute top-2 right-2 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm shadow"
      >
        ✕
      </button>
    </div>
  ) : (
    <label
  htmlFor="image-upload"
  className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md cursor-pointer transition
    ${isDragging ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
  onDragOver={(e) => {
    e.preventDefault();
    setIsDragging(true);
  }}
  onDragLeave={(e) => {
    e.preventDefault();
    setIsDragging(false);
  }}
  onDrop={(e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageChange(file);
  }}
>
  <div className="flex flex-col items-center justify-center">
    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mb-2">
      ⬆
    </div>
    <p className="text-sm text-gray-600 text-center">
      Arraste e solte o arquivo aqui<br />
      ou <span className="underline text-blue-600">Escolher arquivo</span>
    </p>
  </div>
<input
  id="image-upload"
  name="image"
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => handleImageChange(e.target.files?.[0])}
/>
    </label>
  )}
</div>
 */