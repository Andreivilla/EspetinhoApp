import { Product } from "@/app/lib/definitions";
import { UpdateProduct, DeleteProduct } from "./buttons";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
};
function bufferToBase64(bufferObj?: Uint8Array | null) {
  if (!bufferObj) return null;

  let binary = "";
  bufferObj.forEach((b) => (binary += String.fromCharCode(b)));
  return Buffer.from(binary, "binary").toString("base64");
}
export default function ProductCard({ product }: ProductCardProps) {
  let base64: string | null = null;//caso tenha uma imagem não registrada
  if (product.image) {
    base64 = bufferToBase64(product.image);
  }

  return(
    <div className="rounded-xl h-100 w-70 overflow-hidden 
          shadow-lg bg-white border border-gray-200 flex 
          flex-col">
      <div className="h-1/2">
        <Image className="object-cover w-full h-full"
          src={`data:image/png;base64,${base64}`}
            alt={product.name}
        />
      </div>
      
      <div className="p-4 h-1/2 flex flex-col justify-between"> 
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
          </div>
          <span className="text-lg font-bold text-green-600">{product.price}</span>
        </div>
      
        <div className="flex flex-col gap-2 mt-auto">
          <UpdateProduct id={product.id}/>
          <DeleteProduct id={product.id}/>
        </div>
        
      </div>
    </div>
  )
}
//<button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Editar</button>
//<button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition">Excluir</button>