import Link from 'next/link';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import { logoutUser } from '@/actions/auth';
import { redirect } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SidebarNav } from '@/components/SidebarNav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!user || user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="flex h-screen bg-[#F8F9FA] dark:bg-[#121212] transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4D2306] dark:bg-[#2A1102] text-[#E0C097] flex flex-col justify-between shadow-xl z-20 transition-colors duration-300">
        <div>
          <div className="p-6">
            <h1 className="text-2xl font-serif font-bold text-[#F3C49B]">
              Fábrica de Pães
            </h1>
            <p className="text-xs mt-1 text-[#DE773B]">Gestão Interna</p>
          </div>

          <SidebarNav />
        </div>

        <div className="p-4">
          <div className="bg-[#68320A] dark:bg-[#4A2004] rounded-xl p-4 flex items-center justify-between shadow-inner transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E57813] dark:bg-[#D46200] rounded-full flex items-center justify-center text-white font-bold transition-colors">
                {user.name ? user.name[0].toUpperCase() : 'A'}
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">
                  {user.name || 'Administrador'}
                </p>
                <p className="text-[#DE773B] text-xs">Admin</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
          <form action={logoutUser} className="mt-4">
            <button type="submit" className="w-full flex items-center gap-3 text-sm text-[#E0C097] hover:text-white transition-colors py-2 px-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Sair do sistema
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
