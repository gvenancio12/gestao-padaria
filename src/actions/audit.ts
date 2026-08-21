'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function logAction(
  action: string,
  entity: string,
  entityId?: string,
  details?: string
) {
  try {
    const session = await getSession();
    if (!session) return; // Se não houver sessão ativa, ignora (ou loga como sistema)

    await prisma.auditLog.create({
      data: {
        userId: session.userId as string,
        action,
        entity,
        entityId,
        details,
      },
    });
  } catch (error) {
    console.error('Erro ao gravar log de auditoria:', error);
  }
}

export async function getAuditLogs() {
  const session = await getSession();
  if (!session) {
    throw new Error('Não autorizado');
  }

  const logs = await prisma.auditLog.findMany({
    include: {
      user: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 100, // Limita aos últimos 100 eventos
  });

  return logs;
}
