import { fetchNTables } from "@/app/lib/tables/data";
import { CreateTable, DeleteTable } from "@/app/ui/tables/buttons";
export default async function Page({
  searchParams,
}: Readonly<{
  searchParams: Promise<{query: string, page: number}>
}>){
  const nMesas = fetchNTables();

  return (
    <div>
      <h1>Mesas {nMesas}</h1>
      <CreateTable/>
      <DeleteTable/>
    </div>
  )
}