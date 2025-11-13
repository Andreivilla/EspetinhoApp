import { Produto } from '../definitions';
import { getQuery, getAll } from '../db';

const ITEMS_PER_PAGE = 6;

export async function fetchProductsPages(query: string): Promise<number> {
  const sql = `SELECT COUNT(*) AS total FROM PRODUTOS WHERE LOWER(nome) LIKE ?`;
  const params = [`%${query.toLowerCase()}%`];

  const result = await getQuery<{ total: number }>(sql, params);
  return Math.ceil((result?.total ?? 0) / ITEMS_PER_PAGE);  
}

async function isImageAvailable(id: number): Promise<string | null> {
  const baseUrl = process.env.BASE_URL;
  const url = `${baseUrl}/stock-manager/products/${id}/image`
  try {
    const response = await fetch(url, { method: 'GET' });
    return response.ok ? url : null;
  } catch(error) {
    console.log('Não foi possivel validar a imagem', error)
    return null;
  }
}
export async function fetchFilteredProducts(query: string, currentPage: number): Promise<Produto[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const sql = `SELECT id, nome, menu, valor FROM PRODUTOS
    WHERE LOWER(nome) LIKE ?
    ORDER BY nome ASC
    LIMIT ? OFFSET ?`;

  const params = [`%${query.toLowerCase()}%`, ITEMS_PER_PAGE, offset];

  const { success, data, error } = await getAll<Produto>(sql, params);

  if (!success || !data) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }

  const produtosComImagem = await Promise.all(
    data.map(async (produto) => {
      const imagem = await isImageAvailable(produto.id);
      return {
        ...produto,
        imagem,
      };
    })
  );

  return produtosComImagem;
}

export async function fetchFilteredProductsMenuNoPages(query: string): Promise<Produto[]> {
  
  const sql = `
  SELECT id, nome, valor FROM PRODUTOS
  WHERE menu = TRUE 
    AND LOWER(nome) LIKE ?`;

  //const params = [`%${query.toLowerCase()}%`, ITEMS_PER_PAGE];

  const { success, data, error } = await getAll<Produto>(sql, [`%${query.toLowerCase()}%`]);

  if (!success || !data) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }

  const produtosComImagem = await Promise.all(
    data.map(async (produto) => {
      const imagem = await isImageAvailable(produto.id);
      return {
        ...produto,
        imagem,
      };
    })
  );

  return produtosComImagem;
}

export async function fetchFilteredProductsMenu(query: string, currentPage: number): Promise<Produto[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const sql = `SELECT id, nome, valor FROM PRODUTOS
    WHERE menu = TRUE 
      AND LOWER(nome) LIKE ?
    ORDER BY nome ASC
    LIMIT ? OFFSET ?`;

  const params = [`%${query.toLowerCase()}%`, ITEMS_PER_PAGE, offset];

  const { success, data, error } = await getAll<Produto>(sql, params);

  if (!success || !data) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }

  const produtosComImagem = await Promise.all(
    data.map(async (produto) => {
      const imagem = await isImageAvailable(produto.id);
      return {
        ...produto,
        imagem,
      };
    })
  );

  return produtosComImagem;
}


export async function fetchProductById(id: string): Promise<Produto | null> {
  try {
    const sql = 'SELECT id, nome, valor FROM PRODUTOS WHERE id = ?';
    const product = await getQuery<Produto>(sql, [id]);

    if (!product) return null;

    const baseUrl = process.env.BASE_URL;
    const imagemUrl = `${baseUrl}/stock-manager/products/${product.id}/image`;

    return {
      ...product,
      imagem: imagemUrl,
    };
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

export async function fetchProductImageById(id: string) {
  try {
    const sql = 'SELECT imagem FROM PRODUTOS WHERE id = ?';
    const result = await getQuery<{imagem: Buffer}>(sql, [id]);
    return result?.imagem ?? null;
  } catch (error) {
    console.error('Erro na busca da imagem: ', (error as Error).message);
    return null
  }
}