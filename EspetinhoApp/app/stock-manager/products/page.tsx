import Search from '@/app/ui/search';
import { CreateProduct } from '@/app/ui/products/buttons';
import { fetchProductsPages } from '@/app/lib/data';
import ProductGrid from '@/app/ui/products/grid';
import Pagination from '@/app/ui/products/pagination';

export default async function Page({
  searchParams,
  }: {
    searchParams: Promise<{query: string, page: number}>
  }){
    const params = await searchParams;

  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;
    
  const totalPages = await fetchProductsPages(query);
  
  return (
    <div>
      <div className='w-full'>
        <h1>Produtos - {totalPages}</h1>
        <div className='md:h-10 h-22 flex flex-col md:flex-row gap-2'>
            <div className='flex-1 md:flex-3'>
              <Search placeholder='Digite o nome do produto.' />
            </div>
            <div className='flex-1 md:flex-1'>
              <CreateProduct />
            </div>
        </div>
      </div>
        <ProductGrid query={query} currentPage={currentPage} />
          <div className="mt-5 flex w-fu ll justify-center">
        <Pagination totalPages={totalPages}/>
      </div>
    </div>
  )
}