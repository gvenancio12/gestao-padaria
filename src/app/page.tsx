import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { getSession } from '@/lib/session';

export default async function StorefrontPage() {
  const session = await getSession();

  // UC03: Consultar Pães Disponíveis (Apenas os que têm isAvailable = true)
  const availableBreads = await prisma.bread.findMany({
    where: { isAvailable: true },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] transition-colors">
      {/* Cabeçalho Público */}
      <header className="bg-white dark:bg-[#1E1E1E] border-b border-gray-200 dark:border-[#333] shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E57813] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg font-serif">D</span>
            </div>
            <span className="font-serif text-xl font-bold text-gray-900 dark:text-white">Donatos</span>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <form action={async () => {
                'use server';
                const { logout } = await import('@/lib/session');
                await logout();
                const { redirect } = await import('next/navigation');
                redirect('/');
              }}>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors"
                >
                  Sair da Conta
                </button>
              </form>
            ) : (
              <Link 
                href="/login"
                className="px-4 py-2 text-sm font-medium text-[#E57813] bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/40 rounded-lg transition-colors"
              >
                Entrar / Cadastrar
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-[#E57813] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Pães frescos saindo do forno</h1>
          <p className="text-lg text-orange-100 max-w-2xl mx-auto">Confira nosso catálogo de produtos disponíveis para produção imediata. Qualidade e sabor direto da nossa fábrica para a sua mesa.</p>
        </div>
      </div>

      {/* Catálogo de Pães (Vitrine) */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8 border-b-2 border-dashed border-gray-200 dark:border-[#333] pb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">Catálogo Disponível</h2>
          <p className="text-gray-500 dark:text-gray-400">Estes são os itens que possuímos insumos e estoque para produção hoje.</p>
        </div>

        {availableBreads.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-[#333]">
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4m16 0a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Poxa, estamos sem fornada no momento!</h3>
            <p className="text-gray-500 dark:text-gray-400">O administrador não marcou nenhum pão como disponível para produção ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {availableBreads.map((bread) => (
              <div key={bread.id} className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-[#333] overflow-hidden hover:shadow-lg transition-all group flex flex-col">
                {/* Imagem Placeholder */}
                <div className="aspect-video bg-orange-50 dark:bg-[#2A2A2A] flex items-center justify-center border-b border-gray-100 dark:border-[#333]">
                  <span className="text-5xl group-hover:scale-110 transition-transform">🍞</span>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">{bread.name}</h3>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/20 dark:text-green-400">Disponível</span>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 flex-1">{bread.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-[#333]">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Vendido por {bread.unit}</span>
                    <span className="text-xl font-bold text-[#E57813] dark:text-[#F3C49B]">R$ {Number(bread.price).toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-200 dark:border-[#333] flex justify-between items-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Donatos. Todos os direitos reservados.</p>
        <Link href="/login" className="hover:text-[#E57813] transition-colors">
          Acesso Restrito (Admin)
        </Link>
      </footer>
    </div>
  );
}
