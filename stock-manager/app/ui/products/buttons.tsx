import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteProduct } from '@/app/lib/actions';


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

export function UpdateProduct({ id }: { id: string }) {
  return (
    <Link
      href={`/stock-manager/products/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteProduct({ id }: { id: string }) {
  const deleteProductWithId = deleteProduct.bind(null, id);
 
  return (
    <form action={deleteProductWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
/*
export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
 
  return (
    <form action={deleteInvoiceWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
*/