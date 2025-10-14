'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod'
import { runMutation } from '../db';

//const prisma = new PrismaClient();
//product crud
const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Product name is required.' }),
  price: z.coerce.number().gt(0, { message: 'Price must be greater than 0.' }),
  image: z.instanceof(File).optional()
})

export type State = {
  errors?: {
    name?: string[];
    price?: string[];
    image?: string[];
  };
  message?: string | null;
};

const CreateProduct = FormSchema.omit({ id: true});
const UpdateProduct = FormSchema.omit({ id: true});

export const createProduct = async (
  state: State,
  formData: FormData
): Promise<State> => {
  const image = formData.get("image") as File | null;

  const validatedFields = CreateProduct.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    image,
  });

  if (!validatedFields.success) {
    console.log("Erros de validação:", validatedFields.error.issues);
    return {
      message: "Campos inválidos ou ausentes. Falha ao criar produto.",
    };
  }

  const { name, price } = validatedFields.data;

  let bufferImage: Buffer | null = null;
  if (image) {
    const arrayBuffer = await image.arrayBuffer();
    bufferImage = Buffer.from(arrayBuffer);
  }

  const sql = `INSERT INTO PRODUTOS (nome, valor, imagem) VALUES (?, ?, ?)`;
  const params = [name, price, bufferImage];

  const { success, error } = await runMutation(sql, params);

  if (!success) {
    console.error("Erro ao inserir produto:", error);
    return {
      message: "Erro ao criar produto.",
    };
  }

  revalidatePath("/stock-manager/products");
  redirect("/stock-manager/products");
};


export async function deleteProduct(id: string) {
  const sql = 'DELETE FROM PRODUTOS WHERE id = ?';
  const result = await runMutation(sql, [id]);

  if (!result.success) {
    console.error('Erro ao deletar produto:', result.error);
    return;
  }

  revalidatePath('/stock-manager/products');
  redirect('/stock-manager/products');
}
//

export async function updateProduct(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  const image = formData.get("image") as File | null;

  const validatedFields = UpdateProduct.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    image,
  });

  if (!validatedFields.success) {
    console.log("Erros de validação:", validatedFields.error.issues);
    return {
      message: "Campos inválidos ou ausentes. Falha ao atualizar produto.",
    };
  }

  const { name, price } = validatedFields.data;

  let bufferImage: Buffer | null = null;
  if (image && image.size > 0) {
    const arrayBuffer = await image.arrayBuffer();
    bufferImage = Buffer.from(arrayBuffer);
  }

  // Atualiza somente os campos alterados
  const sql = bufferImage
    ? `UPDATE PRODUTOS SET nome = ?, valor = ?, imagem = ? WHERE id = ?`
    : `UPDATE PRODUTOS SET nome = ?, valor = ? WHERE id = ?`;

  const params = bufferImage
    ? [name, price, bufferImage, id]
    : [name, price, id];

  const { success, error } = await runMutation(sql, params);

  if (!success) {
    console.error("Erro ao atualizar produto:", error);
    return {
      message: "Erro ao atualizar produto.",
    };
  }

  revalidatePath("/stock-manager/products");
  redirect("/stock-manager/products");
}
