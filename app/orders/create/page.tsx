import Search from '@/app/ui/search';
import { fetchFilteredProductsMenuNoPages } from '@/app/lib/product/data';
import OrderList from '@/app/ui/orders/orderList';
import { fetchNTables } from '@/app/lib/tables/data';

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

  const products = await fetchFilteredProductsMenuNoPages(query);
  const nTables = await fetchNTables() ?? 0;

  return (
    <div>
      <div className='w-full'>
        <div className='md:h-10 h-12 flex flex-col md:flex-row gap-2'>
          <div className='flex-1 md:flex-3'>
            <Search placeholder='Digite o nome do produto.' />
          </div>
        </div>
      </div>
      <OrderList products={products} nTables={nTables}/>
    </div>
  );
}
