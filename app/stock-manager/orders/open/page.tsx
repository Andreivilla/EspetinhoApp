import { fetchOrdersBySituacao } from '@/app/lib/orders/data';
import OrdersListAdmin from '@/app/ui/orders/ordersOpen';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page({
  searchParams,
}: Readonly< {
  searchParams: Promise<{query: string, page: number}>
}>){
  const ordersList = await fetchOrdersBySituacao('ABERTO');

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
            { 
              label: 'Pedidos em Aberto', 
              href: '/stock-manager/orders/cancel', 
              active: true 
            },
          ]}
        />
      <OrdersListAdmin orders={ordersList}/>
    </div>
  )
}