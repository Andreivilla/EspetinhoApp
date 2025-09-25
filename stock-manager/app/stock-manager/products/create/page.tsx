//import Form from '@/app/ui/invoices/create-form';
import Form from '@/app/ui/products/create_form';
import Breadcrumbs from '@/app/ui/products/breadcrumbs';
//import { fetchCustomers } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoices | create',
};


export default async function Page() {
//  const customers = await fetchCustomers();
 
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
      <Form/>
    </main>
  );
}
//<Form customers={customers} />