export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  image?: Uint8Array | null; // ou Uint8Array, dependendo do uso
};
