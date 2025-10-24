import { createOrder } from "@/app/lib/orders/actions";
type ButtonProps = {
  quantities: Record<number, number>;
  selectedTable: number | null;
};


export function SubmitOrder({ 
  quantities, 
  selectedTable 
}: Readonly <{
  quantities: Record<number, number>;
  selectedTable: number | null;
}>) {

  const createOrderSet = createOrder.bind(null, quantities, selectedTable); 

  return (
    <form action={createOrderSet}>
    <button
      className="rounded-md border p-2 bg-black 
      text-white flex align-center justify-center
      hover:bg-gray-800 w-full"
    >
      Finalizar Pedido
    </button>
    </form>
  );
}
