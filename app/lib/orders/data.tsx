import { Produto } from '../definitions';

import { getQuery, getAll } from '../db';
import { Pedido, PedidoItem } from '../definitions';
import { fetchProductById } from '../product/data';
import { success } from 'zod';

const ITEMS_PER_PAGE = 6;

export async function fetchOrderItens(id: number) {
  try {
    const sql = 'SELECT * FROM PEDIDOITEM WHERE id_pedido = ?';
    const result = await getAll(sql, [id]);
    if (result.data === undefined) {
      return []
    }
    const itens: PedidoItem[] = await Promise.all(
      result.data.map(async (item: any) => ({
        id: item.id,
        id_produto: item.id_produto,
        id_pedido: item.id_pedido,
        quantidade: item.quantidade,
        valor: item.valor,
        produto: await fetchProductById(item.id)
        })
      )
    );

    return itens;
  } catch (error) {
    console.error('Erro ao buscar o preço do produto:', (error as Error).message);
    return null;
  }  
}

export async function fetchTotalPrice(
  input: number | Pedido | PedidoItem[]
): Promise<number> {
  function soma(itens: PedidoItem[]): number {
    return itens.reduce((total, item) => total + item.valor, 0);
  }

  if (Array.isArray(input)) {
    if (input.length > 0) return soma(input);
    throw new Error("Nenhum item encontrado no array fornecido.");
  }

  if (typeof input === "object" && "itens" in input) {
    const pedido = input as Pedido;
    if (pedido.itens && pedido.itens.length > 0)
      return soma(pedido.itens);
    throw new Error("O pedido não contém itens.");
  }

  if (typeof input === "number") {
    const itens = await fetchOrderItens(input);
    if (Array.isArray(itens) && itens.length > 0)
      return soma(itens);
    throw new Error("Nenhum item encontrado para o id_pedido fornecido.");
  }

  throw new Error("Você precisa fornecer um número, um pedido ou uma lista de itens.");
}


export async function fetchOrdersBySituacao(
  situacao: string, 
  currentPage?: number, 
) {
  try{
    let result;
    if(currentPage){
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;
      const sql = 'SELECT * FROM PEDIDOS WHERE situacao = ? LIMITE = ? OFFSET = ?';
      const params = [`%${situacao}%`, ITEMS_PER_PAGE, offset];
      result = await getAll<Pedido>(sql, params)
    }else{
      const sql = 'SELECT * FROM PEDIDOS WHERE situacao = ?';
      result = await getAll<Pedido>(sql, [situacao]);
    }
    
    if(result.data === undefined){
      console.log('Erro nenhum pedido em ', situacao);
      return null;
    }

    const list: Pedido[] = await Promise.all(
      result.data.map(async (pedido: Pedido) => {
        const itens = await fetchOrderItens(pedido.id);
        const total = await fetchTotalPrice(itens ?? []);

        return {
          id: pedido.id,
          data: pedido.data,
          id_mesa: pedido.id_mesa,
          itens,
          total,
          situacao: pedido.situacao,
        };
      })
    );

    return list;
  } catch (error) {
    console.error('Erro ao buscar o preço do produto:', (error as Error).message);
    return null;
  }
}