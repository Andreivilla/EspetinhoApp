import Breadcrumbs from '@/app/ui/breadcrumbs';
import Form from '@/app/ui/products/edit-form';
import { fetchProductById } from '@/app/lib/product/data';
import { notFound } from 'next/navigation'; 

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params;
  
  const product = await fetchProductById(id);
  
  if (!product) {
    notFound();
  }
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
      <Form product={product}/>
    </main>
  );
}

