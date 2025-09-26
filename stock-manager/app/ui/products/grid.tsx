import { fetchFilteredProducts } from "@/app/lib/data";
import ProductCard from "./productcard";

export default async function ProductGrid({
  query,
  currentPage,
}:{
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProducts(query, currentPage);

  return(
    <div className="flex flex-wrap gap-4 justify-center pt-4">
      {products?.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}