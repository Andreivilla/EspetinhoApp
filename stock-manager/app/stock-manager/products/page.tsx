import Search from '@/app/ui/search';
import Form from '@/app/ui/products/create_form';
import ProductCard from '@/app/ui/productcard';
import { fetchFilteredProducts } from '@/app/lib/data';

export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {

  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;

  const products = await fetchFilteredProducts(query, currentPage);


  return (
    <div>
      <div className='w-full'>
        <h1>Produtos</h1>
        <div className='md:flex md:gap-2'>
          <Search placeholder='Digite o nome do produto.'/>
          <Form/>
        </div>
      </div>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          {products?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>

    </div>
  )
}
//<ProductCard product={product}/>