import { fetchOrdersBySituacao } from '@/app/lib/orders/data';
import OrdersListAdmin from '@/app/ui/orders/ordersOpen';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export const dynamic = "force-dynamic";

export default async function Page(){
  const ordersList = await fetchOrdersBySituacao('ABERTO');

  return (
    <main>
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
    </main>
  )
}