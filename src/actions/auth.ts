'use server';

import { prisma } from '@/lib/prisma';
import { createSession, logout } from '@/lib/session';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function registerUser(prevState: any, formData: FormData) {
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

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await createSession(user.id);
  } catch (error) {
    console.error(error);
    return { error: 'Ocorreu um erro ao criar a conta.' };
  }

  redirect('/dashboard');
}

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Por favor, preencha todos os campos.' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: 'Credenciais inválidas.' };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { error: 'Credenciais inválidas.' };
    }

    await createSession(user.id);
  } catch (error) {
    console.error(error);
    return { error: 'Ocorreu um erro ao fazer login.' };
  }

  redirect('/dashboard');
}

export async function logoutUser() {
  await logout();
  redirect('/');
}
