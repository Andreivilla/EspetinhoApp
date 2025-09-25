'use server'
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ProductType } from '@/app/lib/data'; 
import { z } from 'zod'

const prisma = new PrismaClient();

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required.' }),
  price: z.coerce.number().gt(0, { message: 'Price must be greater than 0.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  image: z.any().optional()
 // se estiver vindo de um <input type="file">
})

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const CreateProduct = FormSchema.omit({ id: true, date: true });

export async function createProduct(prevState: State, formData: FormData) {
  console.log('não ta printando')
  const image = formData.get('image') as File | null
  console.log('id: ', formData.get('id'))
  console.log('image: ', formData.get('image'))
  console.log('FormData:', {
  name: formData.get('name'),
  price: formData.get('price'),
  description: formData.get('description'),
  image,
})

  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    price: formData.get('price'),
    description: formData.get('description'),
    image,
  })

if (!validatedFields.success) {
  console.error(validatedFields.error.flatten())
  throw new Error('Invalid form data')
}

  const { name, price, description } = validatedFields.data

  let bufferImage: Buffer | undefined
  if (image) {
    const arrayBuffer = await image.arrayBuffer()
    bufferImage = Buffer.from(arrayBuffer)
  }

  await prisma.product.create({
    data: {
      name,
      price,
      description,
      image: bufferImage,
    },
  })

  revalidatePath('/stock-manager/products')
  redirect('/stock-manager/products')
}