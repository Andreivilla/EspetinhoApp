//import Form from '@/app/ui/products/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/products/edit-form';
import { Produto } from '@/app/lib/definitions';
import { fetchProductById } from '@/app/lib/product/data';
import { notFound } from 'next/navigation'; 

function serializeProduto(produto: Produto): Omit<Produto, 'imagem'> & { imagem?: string | null } {
  return {
    ...produto,
    imagem: produto.imagem ? Buffer.from(produto.imagem).toString('base64') : null,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params; // ← precisa de await aqui (ver erro 3 abaixo)
  
  const product = await fetchProductById(id);
  
  if (!product) {
    notFound();
  }
 const serializableProduct = serializeProduto(product);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/stock-manager/products' },
          {
            label: 'Criar Produtos',
            href: '/stock-manager/products/Create',
            active: true,
          },
        ]}
      />
      <Form product={serializableProduct}/>
    </main>
  );
}
/*
<Form product={}/>
import Breadcrumbs from '@/app/ui/products/breadcrumbs';
import { notFound } from 'next/navigation'; 
import { Metadata } from 'next';
import Form from '@/app/ui/products/edit-form';
import { Produto } from '@/app/lib/definitions';

export const metadata: Metadata = {
  title: 'Invoices | edit',
};

export default function Page({
  product,
}: {
  product: Produto | null;
}) {
  if (!product) {
    notFound();
  }

  const id = product.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/stock-manager/products' },
          {
            label: 'Editar Produtos',
            href: `/stock-manager/products/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form product={product} />
    </main>
  );
}

*/

