import { createTable, deleteTable } from "@/app/lib/tables/actions";
export function CreateTable() { 
  return (
    <form action={createTable}>
      <button type="submit" 
        className="rounded-md border p-2 h-10 bg-black
        text-white flex align-center justify-center
        hover:bg-gray-800 w-full"
      >
        <span>Adicionar Uma Mesa</span>
        
      </button>
    </form>
  );
}
export function DeleteTable() { 
  return (
    <form action={deleteTable}>
      <button type="submit" 
        className="rounded-md border p-2 h-10 bg-red-700
        text-white flex align-center justify-center
        hover:bg-gray-800 w-full"
      >
        <span>Deletar Uma Mesa</span>
        
      </button>
    </form>
  );
}

