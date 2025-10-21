import Search from '@/app/ui/search';
import { fetchProductsPages, fetchFilteredProducts } from '@/app/lib/product/data';
import Pagination from '@/app/ui/products/pagination';
import OrderList from '@/app/ui/orders/orderList';
import { fetchNTables } from '@/app/lib/tables/data';

function serializeProducts(products: any[]) {
  return products.map((p) => {
    if (p.imagem && p.imagem instanceof Uint8Array) {
      const b64 = Buffer.from(p.imagem).toString('base64');
      return {
        ...p,
        imagem: `data:image/jpeg;base64,${b64}`, 
      };
    }
    return { ...p, imagem: null };
  });
}

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
  const productsRaw = await fetchFilteredProducts(query, currentPage);
  const products = serializeProducts(productsRaw);
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

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
