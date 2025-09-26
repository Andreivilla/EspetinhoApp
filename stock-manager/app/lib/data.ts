import { PrismaClient } from "@prisma/client";

export type ProductType = {
  name: string;
  price: number;
  description: string;
  image?: Buffer; // ou Uint8Array, dependendo de como você manipula os dados binários
}

const prisma = new PrismaClient();
const ITEMS_PER_PAGE = 6;
export async function fetchFilteredProducts(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
          { price: { equals: isNaN(Number(query)) ? undefined : Number(query) } },
        ],
      },
      orderBy: {
        name: 'asc',
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    });

    return products;
  } catch (error) {
    console.error('Prisma Error:', error);
    throw new Error('Failed to fetch products.');
  }
}
export async function fetchProductById(id: string) {
  try {
    const data = await prisma.product.findUnique({
      where: { id },
    });
    return data;
  } catch (error) {
    console.error('Erro ao buscar o produto', error);
    return null;
  }
}