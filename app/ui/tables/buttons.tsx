import { createTable, deleteTable } from "@/app/lib/tables/actions";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
export function CreateTable() { 
  return (
    <form action={createTable}>
      <button type="submit" 
        className=" p-2 h-10 w-10 flex align-center justify-center cursor-pointer"
      >
        <ArrowRightCircleIcon
          className="text-black hover:text-gray-500"
        />
        
      </button>
    </form>
  );
}
export function DeleteTable() { 
  return (
    <form action={deleteTable}>
      <button type="submit" 
        className=" p-2 h-10 w-10 flex align-center justify-center cursor-pointer"
      >
        <ArrowLeftCircleIcon 
          className="text-black hover:text-gray-500"
        />
        
      </button>
    </form>
  );
}

