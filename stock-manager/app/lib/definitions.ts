export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  image?: Buffer; // ou Uint8Array, dependendo do uso
};
