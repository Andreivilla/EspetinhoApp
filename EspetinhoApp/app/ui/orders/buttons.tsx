import { createOrder } from "@/app/lib/orders/actions";

export function CreateOrder({ 
  products 
}: Readonly <{ 
  products: any[] 
}>
){
  return (
    <button onClick={createOrder}>

    </button>
  );
}