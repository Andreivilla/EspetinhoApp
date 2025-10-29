import { fetchProductsPages } from '@/app/lib/product/data';
import OrderOpenList from '@/app/ui/orders/ordersOpen';
import { fetchOrdersBySituacao } from '@/app/lib/orders/data';

export default async function Page({
  searchParams,
}: Readonly< {
  searchParams: Promise<{query: string, page: number}>
}>){
    const params = await searchParams;

  const query = params?.query || '';
  //const currentPage = Number(params?.page) || 1;    
  //const totalPages = await fetchProductsPages(query);

  const ordersList = await fetchOrdersBySituacao('ABERTO');


  return (
    <div>
      <p>pedidos em aberto</p>
      <OrderOpenList orders={ordersList}/>
    </div>
  )
}