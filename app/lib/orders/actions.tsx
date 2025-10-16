'use server'
import { runMutation } from '../db';
import { z } from 'zod'
import { fetchProductPriceById } from '../product/data';

const PedidoItemSchema = z.object({
  id: z.number().int().positive().optional(),
  id_produto: z.number().int().positive({ message: 'Produto é obrigatório.' }),
  id_pedido: z.number().int().positive({ message: 'Pedido é obrigatório.' }),
  quantidade: z.number().int().min(1, { message: 'Quantidade deve ser pelo menos 1.' })
});

const PedidoSchema = z.object({
  id: z.number().int().positive().optional(),
  data: z.coerce.date({ message: 'Data inválida ou ausente.' }),
  situacao: z.enum(['ABERTO', 'PAGO', 'CANCELADO']).refine(
    (val) => ['ABERTO', 'PAGO', 'CANCELADO'].includes(val),
    { message: 'Situação deve ser ABERTO, PAGO ou CANCELADO.' }
  )
});

export async function createOrderItem() {
  console.log('em progresso');
}

export async function createOrderNoItens() {
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
  const sql = `INSERT INTO PEDIDOS (data, situacao) VALUES (?, ?)`;
  const params = [data, situacao];

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
  const order = await createOrderNoItens();
  if (order.success){
    console.log('id pedido: ', order.id);
  }
  //if(quantities !== null) validar no client aqui só garantir com zod
  //modal de confirmação com lista de produtos
  //const preco = await fetchProductPriceById('15');
  //console.log('preco:', preco);
  //console.log('quantities:', quantities, 'selectedTable:', selectedTable);
}