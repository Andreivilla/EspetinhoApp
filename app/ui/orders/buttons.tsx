import * as React from 'react';

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
  function handleClick() {
    console.log('🧾 Quantities:', quantities, '🍽️ Mesa selecionada:', selectedTable);
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
