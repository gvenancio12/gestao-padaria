'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

export async function createAdmin(prevState: any, formData: FormData) {
  // 1. Verify if the caller is an Admin
  const session = await getSession();
  if (!session) {
    return { error: 'Não autorizado.' };
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return { error: 'Apenas administradores podem criar novos administradores.' };
  }

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password || !name) {
    return { error: 'Por favor, preencha todos os campos.' };
  }

  if (password.length < 6) {
    return { error: 'A senha deve ter pelo menos 6 caracteres.' };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: 'Este e-mail já está em uso.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    revalidatePath('/dashboard/usuarios');
    return { success: 'Administrador criado com sucesso!' };
  } catch (error) {
    console.error(error);
    return { error: 'Ocorreu um erro ao criar a conta.' };
  }
}
