import Link from "next/link"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import { IconNotes } from "@tabler/icons-react"

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center gap-6"> 
      <Link
          href={`/orders/create`}
          className="
            bg-white shadow-md rounded-lg p-6 flex flex-col 
            items-center justify-between w-64 h-64 bg-">
          <IconNotes className="w-40 h-40"/>
      
        <h2 className="mt-auto text-center text-lg font-semibold text-black">
          Pedidos
        </h2>
      </Link>
      <Link
          href={`/stock-manager/`}
          className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-between w-64 h-64">
          <Cog6ToothIcon className="w-40 h-40"/>      
        <h2 className="mt-auto text-center text-lg font-semibold text-black">
          Admin
        </h2>
      </Link>      
    </div>
  )
}