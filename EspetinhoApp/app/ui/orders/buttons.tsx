import { CreateOrder } from "@/app/lib/orders/actions";
export function CreateOrder({ products }: { products: any[] }) {
  const handleLog = () => {
    console.log('📦 Produtos e quantidades:');
    products.forEach((p) => {
      console.log(`ID: ${p.id}, Quantidade: ${p.quantidade ?? '(sem quantidade)'}`);
    });
  };

  return (
    <button onClick={CreateOrder}>

    </button>
  );
}