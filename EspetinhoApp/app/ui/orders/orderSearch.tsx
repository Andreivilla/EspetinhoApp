import { fetchFilteredProducts } from "@/app/lib/product/data";
import OrderList from "./orderList";

function detectMimeFromBytes(bytes: Uint8Array | number[]) {
  if (!bytes || bytes.length < 4) return "image/jpeg";
  if (bytes[0] === 0xFF && bytes[1] === 0xD8) return "image/jpeg";
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) return "image/png";
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return "image/gif";
  return "image/jpeg";
}

export default async function OrderSearch({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProducts(query, currentPage);

  function getImageSrc(image?: Uint8Array | null): string | null {
    if (!image) return null;
  
    if (image instanceof Uint8Array) {
      const arr = image;
      const mime = detectMimeFromBytes(arr);
      const b64 =
        typeof Buffer !== "undefined"
          ? Buffer.from(arr).toString("base64")
          : btoa(String.fromCharCode(...arr));
      return `data:${mime};base64,${b64}`;
    }
  
    return null;
  }
  
  return (
  <>
    {/* 
    <div className="flex flex-wrap gap-4 justify-center pt-4">
      {products?.map((product) => {
        const imgSrc = getImageSrc(product.imagem);

        return (
          <div
            key={product.id}
            className="rounded-xl h-100 w-70 overflow-hidden shadow-lg bg-white border border-gray-200 flex flex-col"
          >
            <div className="h-1/2">
              {imgSrc ? (
                <img className="object-cover w-full h-full" src={imgSrc} alt={product.nome ?? "produto"} />
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
    */}

  </>
    );
}

