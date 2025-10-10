export type Produto = {
  id: number;
  nome: string;
  valor: number;
  imagem?: Uint8Array | null;
};
export type Mesa = {
  id: number;
}

export type Pedido = {
  id: number;
  data: Date;
  situacao: 'ABERTO' | 'PAGO' | 'CANCELADO';
  itens?: PedidoItem[]; // opcional, se quiser incluir os itens do pedido
};

export type PedidoItem = {
  id: number;
  id_produto: number;
  id_pedido: number;
  quantidade: number;
  valor: number;
  produto?: Produto; // opcional, se quiser incluir os dados do produto
};