import { fetchFilteredProducts } from "@/app/lib/product/data";


function detectMimeFromBytes(bytes: Uint8Array | number[]) {
  if (!bytes || bytes.length < 4) return "image/jpeg";
  if (bytes[0] === 0xFF && bytes[1] === 0xD8) return "image/jpeg";
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) return "image/png";
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return "image/gif";
  return "image/jpeg";
}

export default async function OrderList({
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
    <div className="flex flex-col gap-2 justify-center ">
      {products?.map((product) => {
        const imgSrc = getImageSrc(product.imagem);
        return (
          <div
            key={product.id}
            className="
              bg-white w-full shadow-md rounded-lg p-4 flex flex-row items-center justify-between"
            >
          
            <div className="flex gap-2 justify-center">
              {imgSrc ? (
                <img className="object-cover w-20 h-20" src={imgSrc} alt={product.nome ?? "produto"} />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                  Sem imagem
                </div>
              )}
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-gray-800">{product.nome}</h3>
                <p className="text-gray-500 font-bold">R$ {product.valor.toFixed(2)}</p>
              </div>  
            </div>

            <select
              className="border rounded px-3 py-2"
            >
              {[...Array(30)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}

/*'use client';
import { useState } from "react";
import { OrderCard } from "./orderCard";
import { Produto, PedidoItem } from "@/app/lib/definitions";

export default function OrderList({
  products
}: {
  products: Produto[];
}) {

  const [quantidades, setQuantidades] = useState<Record<number, number>>({});

  function handleQuantidadeChange(id_produto: number, novaQuantidade: number) {
    setQuantidades((prev) => ({ ...prev, [id_produto]: novaQuantidade }));
  }

  function handleConfirmarPedido() {
    const pedidoItems: PedidoItem[] = products.map((produto) => ({
      id: 0,
      id_produto: produto.id,
      id_pedido: 0,
      quantidade: quantidades[produto.id] || 1,
      valor: produto.valor,
      produto,
    }));

    console.log("Pedido gerado:", pedidoItems);
    // aqui você pode enviar pro backend ou salvar no estado global
  }

  return (
    <div className="flex flex-col items-center gap-6 pt-4">
      <div className="flex flex-wrap gap-4 justify-center">
        {products.map((product) => (
          <OrderCard
            key={product.id}
            produto={product}
            quantidade={quantidades[product.id] || 1}
            onQuantidadeChange={handleQuantidadeChange}
          />
        ))}
      </div>

      <button
        onClick={handleConfirmarPedido}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Confirmar Pedido
      </button>
    </div>
  );
}
*/