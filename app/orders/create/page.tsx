import Search from '@/app/ui/search';
import { fetchProductsPages, fetchFilteredProducts } from '@/app/lib/product/data';
import Pagination from '@/app/ui/products/pagination';
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
  const currentPage = Number(params?.page) || 1;

  const totalPages = await fetchProductsPages(query);
  const products = await fetchFilteredProducts(query, currentPage);
  const nTables = await fetchNTables() ?? 0;
  console.log('ntables: ', nTables)

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

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
