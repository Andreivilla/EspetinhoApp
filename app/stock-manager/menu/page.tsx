import Search from '@/app/ui/search';
import { fetchProductsPages, fetchFilteredProductsMenu } from '@/app/lib/product/data';
import Pagination from '@/app/ui/products/pagination';
import MenuList from '@/app/ui/menu/menuList';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export const dynamic = "force-dynamic";

export default async function Page({ 
  searchParams 
}: Readonly<{
  searchParams: Promise<{ 
    query: string, 
    page: number 
  }>
}>) {
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;

  const totalPages = await fetchProductsPages(query);
  const products = await fetchFilteredProductsMenu(query, currentPage);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Menu', href: '/stock-manager/menu', active: true},
        ]}
      />
      <div className='w-full'>
        <div className='md:h-10 h-12 flex flex-col md:flex-row gap-2'>
          <div className='flex-1 md:flex-3'>
            <Search placeholder='Digite o nome do produto.' />
          </div>
        </div>
      </div>
      <MenuList products={products}/>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
