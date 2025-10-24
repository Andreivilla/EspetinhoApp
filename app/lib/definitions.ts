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
  itens: PedidoItem[] | null;
};

export type PedidoItem = {
  id: number;
  id_produto: number;
  id_pedido: number;
  quantidade: number;
  valor: number;
  produto: Produto | null;
};

export type ProdutoSelect = {
  id: number;
  nome: string;
  valor: number;
  imagem?: Uint8Array | null;
  quantitie: number;
}