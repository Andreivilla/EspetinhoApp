import Search from '@/app/ui/search';
import { CreateProduct } from '@/app/ui/products/buttons';
import { fetchProductsPages } from '@/app/lib/data';
import ProductGrid from '@/app/ui/products/grid';
import Pagination from '@/app/ui/products/pagination';

export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {

  //const params = await searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProductsPages(query);
  
  return (
    <div>
      <div className='w-full'>
        <h1>Produtos</h1>
        <div className='md:flex md:gap-2'>
          <Search placeholder='Digite o nome do produto.'/>
          <CreateProduct />
        </div>
      </div>
      <ProductGrid query={query} currentPage={currentPage}/>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages}/>
      </div>
    </div>
  )
}
//        <ProductGrid query={query} currentPage={currentPage}/>
/*<div className="flex flex-wrap gap-4 justify-center pt-4">
          {products?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>*/
//<ProductCard product={product}/>