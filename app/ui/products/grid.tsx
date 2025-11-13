import { fetchFilteredProducts } from "@/app/lib/product/data";
import { UpdateProduct, AdicionarMenu, RemoverMenu } from "./buttons";
import DeleteModal from "./deleteModal";
import Image from "next/image";

export default async function ProductGrid({
  query,
  currentPage,
}: Readonly<{
  query: string;
  currentPage: number;
}>) {
  const products = await fetchFilteredProducts(query, currentPage);

  return (
    <div
      className="
        grid 
        gap-6 
        justify-center 
        pt-4 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4
        2xl:grid-cols-5
      "
    >
      {products?.map((product) => (
        <div
          key={product.id}
          className="
            bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden
            flex flex-col 
            transition-all duration-200 
            hover:shadow-xl hover:scale-[1.02]
            w-full max-w-[280px] sm:max-w-[320px]
          "
        >
          {/* imagem */}
          <div className="h-48">
            {product.imagem ? (
              <div className="relative w-full h-full">
                <Image
                  src={`${product.imagem}?cacheBust=${Date.now()}`}
                  alt={product.nome ?? "produto"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                Sem imagem
              </div>
            )}
          </div>

          <div className="p-4 flex flex-col justify-between flex-1">
            <div>
              <h2
                className="truncate text-lg font-semibold text-gray-800"
                title={product.nome ?? ""}
              >
                {product.nome}
              </h2>
              <span className="text-gray-500 font-bold">
                R$: {Number(product.valor).toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <DeleteModal id={String(product.id)} />
              <UpdateProduct id={String(product.id)} />
              {product.menu ? (
                <RemoverMenu id={String(product.id)} redirectPath="/stock-manager/products"/>
              ) : (
                <AdicionarMenu id={String(product.id)} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
