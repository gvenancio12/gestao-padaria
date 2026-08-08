'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';

export async function getBreads() {
  const session = await getSession();
  if (!session) {
    throw new Error('Não autorizado');
  }

  const breads = await prisma.bread.findMany({
    orderBy: { name: 'asc' },
  });

  return breads;
}

export async function createBread(prevState: any, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) {
      return { error: 'Não autorizado' };
    }

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const priceStr = formData.get('price') as string;
    const category = formData.get('category') as string;
    const unit = formData.get('unit') as string;

    if (!name || !priceStr || !category || !unit) {
      return { error: 'Preencha os campos obrigatórios' };
    }

    // Replace comma with dot for decimal parsing
    const price = parseFloat(priceStr.replace(',', '.'));

    await prisma.bread.create({
      data: {
        name,
        description,
        price,
        category,
        unit,
      },
    });

    revalidatePath('/dashboard/paes');
    return { success: 'Pão cadastrado com sucesso!' };
  } catch (error) {
    return { error: 'Erro ao cadastrar pão. Tente novamente.' };
  }
}

export async function toggleBreadAvailability(id: string, isAvailable: boolean) {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error('Não autorizado');
    }

    await prisma.bread.update({
      where: { id },
      data: { isAvailable },
    });

    revalidatePath('/dashboard/paes');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro ao atualizar disponibilidade' };
  }
}

export async function deleteBread(id: string) {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error('Não autorizado');
    }

    await prisma.bread.delete({
      where: { id },
    });

    revalidatePath('/dashboard/paes');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro ao deletar pão' };
  }
}
