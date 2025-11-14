import { fetchOrdersBySituacao } from '@/app/lib/orders/data';
import OrdersListAdmin from '@/app/ui/orders/ordersOpen';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page(){
  const ordersList = await fetchOrdersBySituacao('PAGO');

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
            { 
              label: 'Pedidos Concluidos', 
              href: '/stock-manager/orders/cancel', 
              active: true 
            },
          ]}
        />
      <OrdersListAdmin orders={ordersList}/>
    </main>
  )
}