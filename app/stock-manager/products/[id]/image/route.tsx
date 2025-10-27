import { NextResponse } from "next/server";
import { fetchProductImageById } from "@/app/lib/product/data";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const imagem = await fetchProductImageById(params.id);

  if (!imagem || imagem?.length === 0) {
    return new NextResponse("Imagem não encontrada ou produto sem imagem", {
      status: 404,
    });
  }
  
  const uint8Array = new Uint8Array(imagem);

  return new NextResponse(uint8Array, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
