'use client';

import { useState } from 'react';
import { Button } from './button';

export default function LogButton({
  products,
  nTables,
}: {
  products: any[];
  nTables: number;
}) {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const handleLog = () => {
    console.log('📦 Produtos e quantidades:');
    products.forEach((p) => {
      console.log(`ID: ${p.id}, Quantidade: ${p.quantidade ?? '(sem quantidade)'}`);
    });
    console.log('🪑 Mesa selecionada:', selectedTable ?? 'nenhuma');
  };

  return (
    <div className="mt-3 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="mesa" className="text-gray-700 font-medium">
          Mesa:
        </label>
        <select
          id="mesa"
          className="border rounded px-3 py-2"
          value={selectedTable ?? ''}
          onChange={(e) => setSelectedTable(Number(e.target.value))}
        >
          <option value="">Selecione</option>
          {[...Array(nTables)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Mesa {i + 1}
            </option>
          ))}
        </select>
      </div>

      <Button onClick={handleLog}>
        Logar IDs e Quantidades
      </Button>
    </div>
  );
}
