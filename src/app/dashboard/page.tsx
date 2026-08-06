import { getSession } from '@/lib/session';
import { logoutUser } from '@/actions/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#7A2A03]">
            Painel de Controle
          </h1>
          <form action={logoutUser}>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Sair
            </button>
          </form>
        </div>
        
        <p className="text-gray-600">
          Bem-vindo(a), <span className="font-semibold text-gray-900">{user.email}</span>!
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Esta é a sua página inicial após o login. Em breve, os pedidos da Fábrica de Pães aparecerão aqui.
        </p>
      </div>
    </div>
  );
}
