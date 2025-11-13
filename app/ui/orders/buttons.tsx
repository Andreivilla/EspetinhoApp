import { createOrder, CancelarOrder, FinalizarOrder } from "@/app/lib/orders/actions";

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

  if (!selectedTable || !quantities || Object.keys(quantities).length === 0) {
    return null;
  }

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

export function CancelarPedido({ 
  id 
}:Readonly <{ 
  id: number
}>){
  const cancelarOrder = CancelarOrder.bind(null, id);
 
  return (
    <form action={cancelarOrder}>
      <button type="submit" 
        className="rounded-md p-2 bg-black text-white
        flex align-center justify-center w-full mb-2"
      >
        <span>Confirmar</span>
        
      </button>
    </form>
  );
}
export function FinalizarPedido({ 
  id 
}:Readonly <{ 
  id: number
}>){
  const finalizarOrder = FinalizarOrder.bind(null, id);
 
  return (
    <form action={finalizarOrder}>
      <button type="submit" 
        className="rounded-md p-2 bg-black text-white
        flex align-center justify-center w-full mb-2"
      >
        <span>Confirmar</span>
        
      </button>
    </form>
  );
}

