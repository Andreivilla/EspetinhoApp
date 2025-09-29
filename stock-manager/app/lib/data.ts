import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ITEMS_PER_PAGE = 6;

export async function fetchProductsPages(query: string) {
  try {
    const loweredQuery = query.toLowerCase();

    const filters = [
      {
        name: {
          contains: loweredQuery,
        },
      },
      {
        description: {
          contains: loweredQuery,
        },
      },
    ];

    const totalCount = await prisma.product.count({
      where: {
        OR: filters,
      },
    });

    const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
    return totalPages;
  } catch (error) {
    console.error('Prisma Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

// do invoices pra aprender
/*
export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}*/

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