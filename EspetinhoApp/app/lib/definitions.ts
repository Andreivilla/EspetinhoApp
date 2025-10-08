export type Produto = {
  id: number;
  nome: string;
  valor: number;
  imagem?: Uint8Array | null;
};