'use client';
import { Pedido } from '@/app/lib/definitions';
import { CheckOrderAdmin } from './buttonsClient';

export default function OrdersListAdmin({
  orders,
}: Readonly<{
  orders: Pedido[] | null
}>){
  return (
    <div>
      {orders == null ? (
        <p>Nenhum pedido em aberto</p>
      ): (
        <ul className='space-y-4'>
          {orders.map((pedido) => (
            <li key={pedido.id}>
              <CheckOrderAdmin pedido={pedido}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
