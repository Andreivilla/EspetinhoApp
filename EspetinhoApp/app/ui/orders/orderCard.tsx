'use client';
import { Produto, PedidoItem } from "@/app/lib/definitions";

type Props = {
  produto: Produto;
  quantidade: number;
  onQuantidadeChange: (id_produto: number, novaQuantidade: number) => void;
};

export function OrderCard({ produto, quantidade, onQuantidadeChange }: Props) {

  function getImageSrc(image?: Uint8Array | null): string | null {
    if (!image) return null;
    if (image instanceof Uint8Array) {
      const mime = detectMimeFromBytes(image);
      const b64 =
        typeof Buffer !== "undefined"
          ? Buffer.from(image).toString("base64")
          : btoa(String.fromCharCode(...image));
      return `data:${mime};base64,${b64}`;
    }
    return null;
  }

  function detectMimeFromBytes(bytes: Uint8Array | number[]) {
    if (!bytes || bytes.length < 4) return "image/jpeg";
    if (bytes[0] === 0xFF && bytes[1] === 0xD8) return "image/jpeg";
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) return "image/png";
    return "image/jpeg";
  }


  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64 flex flex-col items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-800">{produto.nome}</h3>
      <p className="text-gray-600 font-bold">R$ {produto.valor.toFixed(2)}</p>

      <select
        value={quantidade}
        onChange={(e) => onQuantidadeChange(produto.id, Number(e.target.value))}
        className="mt-4 border rounded px-3 py-2"
      >
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
}
