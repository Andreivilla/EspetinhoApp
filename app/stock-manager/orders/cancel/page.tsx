import OrdersListAdmin from '@/app/ui/orders/ordersOpen';
import { fetchOrdersBySituacao } from '@/app/lib/orders/data';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export const dynamic = "force-dynamic";

export default async function Page(){
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