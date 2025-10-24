import { Produto } from '../definitions';

import { getQuery, getAll } from '../db';
import { Pedido, PedidoItem } from '../definitions';
import { fetchProductById } from '../product/data';
import { success } from 'zod';

//const prisma = new PrismaClient();// apagar

const ITEMS_PER_PAGE = 6;

//
export async function fetchOrderItens(id: number) {
  try {
    const sql = 'SELECT * FROM PEDIDOITEM WHERE id_pedido = ?';
    const result = await getAll(sql, [id]);
    console.log('resultIten: ', result);
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
      })));

    return itens;
  } catch (error) {
    console.error('Erro ao buscar o preço do produto:', (error as Error).message);
    return null;
  }  
}

export async function fetchOrdersBySituacao(situacao: string) {
  try{
    const sql = 'SELECT * FROM PEDIDOS WHERE situacao = ?'
    const result = await getAll<Pedido>(sql, [situacao]);
    
    //console.log('result.data: ', result.data);
    
    if(result.data === undefined){
      console.log('Erro nenhum pedido em ', situacao);
    }else{
      for (const order of result.data ){
        const newOrder: Pedido ={
          id: order.id,
          data: order.data,
          situacao: order.situacao,
          itens: await fetchOrderItens(order.id)
        }
      }
    }

    return result.data;
  } catch (error) {
    console.error('Erro ao buscar o preço do produto:', (error as Error).message);
    return null;
  }
}