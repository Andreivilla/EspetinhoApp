import { fetchFilteredProducts } from "@/app/lib/product/data";
import { UpdateProduct } from "./buttons";
import DeleteModal from "./deleteModal";

export default async function ProductGrid({
  query,
  currentPage,
}: Readonly<{
  query: string;
  currentPage: number;
}>) {
  const products = await fetchFilteredProducts(query, currentPage);
  
  return (
    <div className="flex flex-wrap gap-4 justify-center pt-4">
      {products?.map((product) => {
        return (
          <div
            key={product.id}
            className="rounded-xl h-100 w-70 overflow-hidden shadow-lg bg-white border border-gray-200 flex flex-col"
          >
            <div className="h-1/2">
              {product.imagem ? (
                <img className="object-cover w-full h-full" src={product.imagem} alt={product.nome ?? "produto"} />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                  Sem imagem
                </div>
              )}
            </div>

            <div className="p-4 h-1/2 flex flex-col justify-between">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{product.nome}</h2>
                </div>
                <span className="text-lg font-bold text-green-600">{product.valor}</span>
              </div>

              <div className="flex flex-col gap-2 mt-auto">
                <DeleteModal id={String(product.id)} /> 
                <UpdateProduct id={String(product.id)} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
