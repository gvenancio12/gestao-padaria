import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export default async function DashboardPage() {
  const session = await getSession();

  // Buscar dados reais do banco
  const totalOrders = await prisma.order.count();
  
  const allOrders = await prisma.order.findMany({
    include: { items: true },
  });

  const totalRevenue = allOrders.reduce((acc, order) => acc + Number(order.totalAmount), 0);
  
  const totalItemsProduced = allOrders.reduce((acc, order) => {
    return acc + order.items.reduce((itemAcc, item) => itemAcc + item.quantity, 0);
  }, 0);

  const completedOrders = allOrders.filter(o => o.status === 'CONCLUIDO').length;

  // Status Breakdown para o Chart
  const statusCounts = {
    ENTREGUE: completedOrders,
    EM_PRODUCAO: allOrders.filter(o => o.status === 'EM_PRODUCAO').length,
    PENDENTE: allOrders.filter(o => o.status === 'PENDENTE').length,
    PRONTO: allOrders.filter(o => o.status === 'PRONTO').length,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-serif text-[#1F2937] dark:text-white transition-colors">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 transition-colors">Visão geral das operações da fábrica</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-sm p-6 border border-gray-100 dark:border-[#333333] flex items-center gap-4 transition-colors">
          <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 rounded-xl flex items-center justify-center transition-colors">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium transition-colors">Pedidos Totais</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">{totalOrders}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-sm p-6 border border-gray-100 dark:border-[#333333] flex items-center gap-4 transition-colors">
          <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-xl flex items-center justify-center transition-colors">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium transition-colors">Itens Produzidos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">{totalItemsProduced}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-sm p-6 border border-gray-100 dark:border-[#333333] flex items-center gap-4 transition-colors">
          <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400 rounded-xl flex items-center justify-center transition-colors">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium transition-colors">Receita Estimada</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">R$ {totalRevenue.toFixed(2).replace('.', ',')}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-sm p-6 border border-gray-100 dark:border-[#333333] flex items-center gap-4 transition-colors">
          <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-400 rounded-xl flex items-center justify-center transition-colors">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium transition-colors">Pedidos Concluídos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">{completedOrders}</p>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-sm p-6 border border-gray-100 dark:border-[#333333] min-h-[400px] transition-colors">
          <h2 className="font-bold font-serif text-[#1F2937] dark:text-white text-lg mb-6 transition-colors">Volume de Pedidos (7 dias)</h2>
          <div className="w-full h-64 border-b border-l border-gray-200 dark:border-[#444] relative flex items-end justify-around pb-2 px-4 pt-10 transition-colors">
            {/* Fake grid lines */}
            <div className="absolute top-0 w-full border-t border-dashed border-gray-100 dark:border-[#333]"></div>
            <div className="absolute top-1/2 w-full border-t border-dashed border-gray-100 dark:border-[#333]"></div>
            
            <div className="w-12 bg-blue-100 dark:bg-blue-900/50 rounded-t-sm h-[30%]"></div>
            <div className="w-12 bg-blue-200 dark:bg-blue-800/50 rounded-t-sm h-[50%]"></div>
            <div className="w-12 bg-blue-300 dark:bg-blue-700/50 rounded-t-sm h-[40%]"></div>
            <div className="w-12 bg-blue-400 dark:bg-blue-600/50 rounded-t-sm h-[70%]"></div>
            <div className="w-12 bg-blue-500 dark:bg-blue-500/80 rounded-t-sm h-[60%]"></div>
            <div className="w-12 bg-blue-600 dark:bg-blue-500 rounded-t-sm h-[90%]"></div>
            <div className="w-12 bg-blue-700 dark:bg-blue-400 rounded-t-sm h-[80%]"></div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-sm p-6 border border-gray-100 dark:border-[#333333] min-h-[400px] transition-colors">
          <h2 className="font-bold font-serif text-[#1F2937] dark:text-white text-lg mb-6 transition-colors">Status Atual</h2>
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <div className="relative w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-colors" 
                 style={{
                   background: totalOrders === 0 ? '#e2e8f0' : 'conic-gradient(#10B981 0% 45%, #F43F5E 45% 65%, #64748B 65% 80%, #F59E0B 80% 90%, #EAB308 90% 100%)' // Simplificado visualmente
                 }}>
              <div className="w-36 h-36 bg-white dark:bg-[#1E1E1E] rounded-full transition-colors flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">{totalOrders}</span>
                <span className="text-xs text-gray-500">Total</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><span className="w-3 h-3 rounded-full bg-slate-500"></span> Concluído ({statusCounts.ENTREGUE})</div>
              <div className="flex items-center gap-2 text-amber-500"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Em Produção ({statusCounts.EM_PRODUCAO})</div>
              <div className="flex items-center gap-2 text-yellow-500"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> Pendente ({statusCounts.PENDENTE})</div>
              <div className="flex items-center gap-2 text-emerald-500"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Pronto ({statusCounts.PRONTO})</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
