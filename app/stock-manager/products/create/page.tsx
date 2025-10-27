import Form from '@/app/ui/products/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page() {
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