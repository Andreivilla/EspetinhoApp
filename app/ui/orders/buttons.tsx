import { createOrder } from "@/app/lib/orders/actions";
type ButtonProps = {
  quantities: Record<number, number>;
  selectedTable: number | null;
};


export function Button({ 
  quantities, 
  selectedTable 
}: Readonly <{
  quantities: Record<number, number>;
  selectedTable: number | null;
}>) {

  async function handleClick() {
    await createOrder(quantities, selectedTable);
  }

  return (
    <button
      className="rounded-md border p-2 bg-black 
      text-white flex align-center justify-center
      hover:bg-gray-800"
      onClick={handleClick}
    >
      Finalizar Pedido
    </button>
  );
}
