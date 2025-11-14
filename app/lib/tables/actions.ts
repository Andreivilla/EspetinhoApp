'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { runMutation } from '../db';

export type State = {
  errors?: {
    name?: string[];
    price?: string[];
    image?: string[];
  };
  message?: string | null;
};

export async function createTable() {
  const sql = `INSERT INTO MESAS (id) SELECT 
    COALESCE(MAX(id), 0) + 1 FROM MESAS;`;
  
  const result = await runMutation(sql);

  if (!result.success) {
    console.error('Erro ao adicionar mesa:', result.error);
    return;
  }

  revalidatePath('/stock-manager/');
  redirect('/stock-manager/');
}

export async function deleteTable() {
  const sql = `DELETE FROM MESAS
    WHERE id = (SELECT MAX(id) FROM MESAS);`;
  
  const result = await runMutation(sql);

  if (!result.success) {
    console.error('Erro ao deletar mesa:', result.error);
    return;
  }

  revalidatePath('/stock-manager/');
  redirect('/stock-manager/');
}

