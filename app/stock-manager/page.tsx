import { fetchNTables } from "../lib/tables/data";
import CardTable from "../ui/tables/card"
import { fetchOrdersBySituacao } from "../lib/orders/data";
import OrderOpenList from "../ui/orders/ordersOpen";
import Breadcrumbs from "../ui/breadcrumbs";

export default async function Page() {
  const nTables = await fetchNTables() ?? 0;

  const ordersList = await fetchOrdersBySituacao('ABERTO');

  return (
    
    <main className="flex flex-col gap-2">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/stock-manager/', active: true},
        ]}
      />

      <CardTable nTables={nTables}/>
      <div className="w-full items-center justify-between bg-white shadow-md rounded-lg p-2">
        <h1 className="text-xl mb-2">Pedidos em Aberto:</h1>
        <OrderOpenList orders={ordersList}/>
      </div>
    </main>
  )
}