//import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/products/breadcrumbs';
//import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';
//import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchProductById } from '@/app/lib/data';
import Form from '@/app/ui/products/edit-form';

export const metadata: Metadata = {
  title: 'Invoices | edit',
};

// export default async function Page() {
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  
  const [product] = await Promise.all([
      fetchProductById(id),
    ]);

  if (!product) {
      notFound();
  }
        
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
      <Form/>
    </main>
  );
}
//<Form invoice={invoice} customers={customers} />