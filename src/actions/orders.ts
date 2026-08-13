'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import { logAction } from './audit';

export async function getOrders() {
  const session = await getSession();
  if (!session) {
    throw new Error('Não autorizado');
  }

  const orders = await prisma.order.findMany({
    include: {
      customer: true,
      items: {
        include: {
          bread: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return orders;
}

export async function updateOrderStatus(orderId: string, status: 'PENDENTE' | 'EM_PRODUCAO' | 'PRONTO' | 'CONCLUIDO') {
  const session = await getSession();
  if (!session) {
    throw new Error('Não autorizado');
  }

  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    await logAction('MOVEU', 'PEDIDO', order.id, `Moveu para: ${status}`);

    revalidatePath('/dashboard/pedidos');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro ao atualizar o pedido' };
  }
}
