import { Produto } from '../definitions';
import { getQuery, getAll } from '../db';
//const prisma = new PrismaClient();// apagar

const ITEMS_PER_PAGE = 6;

export async function fetchProductsPages(query: string): Promise<number> {
  const sql = `SELECT COUNT(*) AS total FROM PRODUTOS WHERE LOWER(nome) LIKE ?`;
  const params = [`%${query.toLowerCase()}%`];

  const result = await getQuery<{ total: number }>(sql, params);
  return Math.ceil((result?.total ?? 0) / ITEMS_PER_PAGE);  
}

export async function fetchFilteredProducts(query: string, currentPage: number): Promise<Produto[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const sql = `SELECT id, nome, valor, imagem
    FROM PRODUTOS
    WHERE LOWER(nome) LIKE ?
    ORDER BY nome ASC
    LIMIT ? OFFSET ?`;

  const params = [`%${query.toLowerCase()}%`, ITEMS_PER_PAGE, offset];

  const { success, data, error } = await getAll<Produto>(sql, params);

  if (!success || !data) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
  return data;
}

export async function fetchProductById(id: string): Promise<Produto | null> {
  try {
    const sql = 'SELECT * FROM PRODUTOS WHERE id = ?';
    const product = await getQuery<Produto>(sql, [id]);
    return product;
  } catch (error) {
    console.error('Erro ao buscar o produto:', (error as Error).message);
    return null;
  }
}

export async function fetchProductPriceById(id: string): Promise<number | null> {
  try {
    const sql = 'SELECT valor FROM PRODUTOS WHERE id = ?';
    const result = await getQuery<{ valor: number }>(sql, [id]);
    return result?.valor ?? null;
  } catch (error) {
    console.error('Erro ao buscar o preço do produto:', (error as Error).message);
    return null;
  }
}