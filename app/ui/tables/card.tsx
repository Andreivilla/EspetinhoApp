import { CreateTable, DeleteTable } from "./buttons"

export default async function CardTablePage({ 
  nTables
}: Readonly<{
  nTables: number
}>) {
 return(
<div className="w-full flex items-center justify-between bg-white shadow-md rounded-lg p-2">
  <span className="text-lg font-medium">
    Mesas:
  </span>
  <div className="flex items-center gap-4">
    <DeleteTable />
      <p>{nTables}</p>
    <CreateTable />
  </div>
</div>
 ) 
}