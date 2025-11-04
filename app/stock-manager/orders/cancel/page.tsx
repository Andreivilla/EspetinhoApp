import OrdersListAdmin from '@/app/ui/orders/ordersOpen';
import { fetchOrdersBySituacao } from '@/app/lib/orders/data';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page({
  searchParams,
}: Readonly< {
  searchParams: Promise<{query: string, page: number}>
}>){
  const ordersList = await fetchOrdersBySituacao('CANCELADO', );
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { 
            label: 'Pedidos Cancelados', 
            href: '/stock-manager/orders/cancel', 
            active: true 
          },
        ]}
      />
      <OrdersListAdmin orders={ordersList}/>  
    </main>
  )
}