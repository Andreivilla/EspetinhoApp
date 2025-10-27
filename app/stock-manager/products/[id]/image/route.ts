import { NextResponse } from "next/server";
import { fetchProductImageById } from "@/app/lib/product/data";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const segments = url.pathname.split("/"); 
  const id = segments[3]; 

  const imagem = await fetchProductImageById(id);

  if (!imagem || imagem.length === 0) {
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
