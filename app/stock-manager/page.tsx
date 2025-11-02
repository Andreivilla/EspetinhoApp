import { fetchNTables } from "../lib/tables/data";
import CardTable from "../ui/tables/card"

export default async function Page() {
  const nTables = await fetchNTables() ?? 0;
  return (
    <CardTable nTables={nTables}/>
  )
}