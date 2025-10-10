'use client';
import { Button } from "./button";

export default function LogButton({ products }: { products: any[] }) {
  const handleLog = () => {
    console.log('📦 Produtos e quantidades:');
    products.forEach((p) => {
      console.log(`ID: ${p.id}, Quantidade: ${p.quantidade ?? '(sem quantidade)'}`);
    });
  };

  return (
    <div className="mt-3">
      <Button onClick={handleLog} className="bg-blue-600 hover:bg-blue-700">
        Logar IDs e Quantidades
      </Button>
    </div>
  );
}
