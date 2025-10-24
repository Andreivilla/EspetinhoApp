'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { runMutation } from '../db';
import { z } from 'zod'
import { fetchProductPriceById } from '../product/data';

const PedidoItemSchema = z.object({
  id: z.number().int().positive().optional(),
  id_produto: z.number().int().positive({ message: 'Produto é obrigatório.' }),
  id_pedido: z.number().int().positive({ message: 'Pedido é obrigatório.' }),
  quantidade: z.number().int().min(1, { message: 'Quantidade deve ser pelo menos 1.' }),
  valor: z.number().min(0, { message: 'Valor deve ser um número positivo.' })
});

const PedidoSchema = z.object({
  id: z.number().int().positive().optional(),
  data: z.coerce.date({ message: 'Data inválida ou ausente.' }),
  situacao: z.enum(['ABERTO', 'PAGO', 'CANCELADO']).refine(
    (val) => ['ABERTO', 'PAGO', 'CANCELADO'].includes(val),
    { message: 'Situação deve ser ABERTO, PAGO ou CANCELADO.' }
  )
});

export async function createOrderItem(
  id_produto_param: number,
  quantitie_param: number,
  id_pedido_param: number
) {
  const CreateOrderItem = PedidoItemSchema.omit({ id: true});
  const valor_fetch = await fetchProductPriceById(String(id_produto_param));
  
  if (valor_fetch == null) {
    throw new Error('Produto não encontrado ou sem preço definido.');
  }

  const validatedFields = CreateOrderItem.safeParse({
    id_produto: id_produto_param,
    id_pedido: id_pedido_param,
    quantidade: quantitie_param,
    valor: quantitie_param*valor_fetch,
  })

    if (!validatedFields.success) {
    console.log("Erros de validação:", validatedFields.error.issues);
    return {
      success: false,
      message: "Campos inválidos ou ausentes. Falha ao criar item pedido.",
    };
  }

  const { id_produto, id_pedido, quantidade, valor } = validatedFields.data;
  const sql = `INSERT INTO PEDIDOITEM (id_produto, id_pedido, quantidade, valor) VALUES (?, ?, ?, ?)`;
  const params = [id_produto, id_pedido, quantidade , valor];
  
  const { success, lastID } = await runMutation(sql, params);
  if (!success) {
    return {
      success: false,
      message: "Erro ao criar pedido.",
    };
  }

  return {
    success: true,
    id: lastID,
  };
}

export async function createOrderNoItens(
  table: number | null, 
) {
  const CreateOrder = PedidoSchema.omit({ id: true });

  const validatedFields = CreateOrder.safeParse({
    data: new Date(),
    situacao: 'ABERTO',
  });

  if (!validatedFields.success) {
    console.log("Erros de validação:", validatedFields.error.issues);
    return {
      success: false,
      message: "Campos inválidos ou ausentes. Falha ao criar pedido.",
    };
  }

  const { data, situacao } = validatedFields.data;
  const sql = `INSERT INTO PEDIDOS (data, situacao, id_mesa) VALUES (?, ?, ?)`;
  const params = [data, situacao, table];

  const { success, error, lastID } = await runMutation(sql, params);

  if (!success) {
    console.error("Erro ao inserir pedido:", error);
    return {
      success: false,
      message: "Erro ao criar pedido.",
    };
  }

  return {
    success: true,
    //message: "Pedido criado com sucesso.",
    id: lastID,
  };
}


export async function createOrder(
  quantities: Record<number, number>, 
  selectedTable: number | null,
) {
  const order = await createOrderNoItens(selectedTable);
  if (order.success && order.id !== undefined) {
    for (const productId in quantities) {
      const quantity = quantities[Number(productId)];
      await createOrderItem(
        Number(productId),
        quantity,
        order.id,
      )
    }
    revalidatePath("/orders/create");
    redirect("/orders/create");
  }
}