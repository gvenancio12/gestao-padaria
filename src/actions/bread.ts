'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import { logAction } from './audit';
import { createClient } from '@supabase/supabase-js';

// Inicializa o cliente do Supabase
// Nota: Certifique-se de que NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY 
// (ou NEXT_PUBLIC_SUPABASE_ANON_KEY) existam no seu arquivo .env
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

export async function createBread(prevState: unknown, formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { error: 'Não autorizado' };
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const priceStr = formData.get('price') as string;
  const category = formData.get('category') as string;
  const unit = formData.get('unit') as string;
  
  // 1. Pega o arquivo de imagem do FormData
  const imageFile = formData.get('image') as File | null;

  if (!name || !priceStr || !category || !unit) {
    return { error: 'Preencha os campos obrigatórios' };
  }

  try {
    // Substitui a vírgula por ponto para o parse do decimal
    const price = parseFloat(priceStr.replace(',', '.'));
    
    let imageUrl: string | undefined = undefined;

    // 2. Faz o upload da imagem se uma foi fornecida
    if (imageFile && imageFile.size > 0) {
      // Cria um nome de arquivo único para evitar substituições indesejadas
      const fileName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      // Converte o File para ArrayBuffer para o upload no Supabase
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from('bread-images') // O nome exato do bucket que você criou
        .upload(fileName, buffer, {
          contentType: imageFile.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Erro ao fazer upload para o Supabase:", uploadError);
        return { error: 'Erro ao fazer upload da imagem. O pão não foi cadastrado.' };
      }

      // 3. Pega a URL pública do arquivo que acabou de ser feito o upload
      const { data: publicUrlData } = supabase.storage
        .from('bread-images')
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    // 4. Salva no Prisma, agora incluindo o imageUrl
    await prisma.bread.create({
      data: {
        name,
        description,
        price,
        category,
        unit,
        imageUrl, // Salvando a URL que acabamos de gerar
      },
    });

    revalidatePath('/dashboard/paes');
    return { success: 'Pão cadastrado com sucesso!' };
  } catch (error) {
    console.error("Erro ao criar pão:", error);
    return { error: 'Erro ao cadastrar pão. Tente novamente.' };
  }
}

// ... toggleBreadAvailability e deleteBread permanecem inalterados
export async function toggleBreadAvailability(orderId: string, isAvailable: boolean) {
  const session = await getSession();
  if (!session) {
    throw new Error('Não autorizado');
  }

  try {
    const bread = await prisma.bread.update({
      where: { id: orderId },
      data: { isAvailable },
    });

    await logAction('ATUALIZOU', 'PÃO', bread.id, `Alterou disponibilidade para: ${isAvailable ? 'Sim' : 'Não'}`);

    revalidatePath('/dashboard/paes');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro ao atualizar disponibilidade' };
  }
}

export async function deleteBread(orderId: string) {
  const session = await getSession();
  if (!session) {
    throw new Error('Não autorizado');
  }

  try {
    const bread = await prisma.bread.delete({
      where: { id: orderId },
    });

    await logAction('DELETOU', 'PÃO', bread.id, `Deletou o pão: ${bread.name}`);

    revalidatePath('/dashboard/paes');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro ao deletar pão' };
  }
}