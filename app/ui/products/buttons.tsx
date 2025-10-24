import Link from 'next/link';
import { deleteProduct } from '@/app/lib/product/actions';

export function CreateProduct() {
  return (
    <Link
      href="/stock-manager/products/create"
      className="flex items-center justify-center 
      rounded-lg bg-black font-medium text-white 
      transition-colors h-full w-full"
    >
      <span>Adicionar Produto</span>
    </Link>
  );
}

export function UpdateProduct({ 
  id 
}:Readonly <{ 
  id: string
}>){
  return (
    <Link
      href={`/stock-manager/products/${id}/edit`}
      className="rounded-md border p-2 bg-black 
      text-white flex align-center justify-center
      hover:bg-gray-800"
    >
      <span>Editar Produto</span>
    </Link>
  );
}

export function DeleteProduct({ 
  id 
}:Readonly <{ 
  id: string
}>){
  const deleteProductWithId = deleteProduct.bind(null, id);
 
  return (
    <form action={deleteProductWithId}>
      <button type="submit" 
        className="rounded-md border p-2 h-10 bg-red-700
        text-white flex align-center justify-center
        hover:bg-gray-800 w-full"
      >
        <span>Deletar Produto</span>
        
      </button>
    </form>
  );
}
