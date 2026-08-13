import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { PrintButton } from '@/components/PrintButton';

export default async function ProducaoPage() {
  const session = await getSession();

  // Buscar todos os itens de pedidos pendentes ou em produção
  const activeOrders = await prisma.order.findMany({
    where: {
      status: {
        in: ['PENDENTE', 'EM_PRODUCAO']
      }
    },
    include: {
      items: {
        include: { bread: true }
      }
    }
  });

  // Agrupar os pães
  const productionList: Record<string, number> = {};
  
  activeOrders.forEach(order => {
    order.items.forEach(item => {
      const name = item.bread.name;
      if (!productionList[name]) {
        productionList[name] = 0;
      }
      productionList[name] += item.quantity;
    });
  });

  const hasItemsToProduce = Object.keys(productionList).length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-serif text-[#1F2937] dark:text-white transition-colors">Relatório de Produção</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 transition-colors">Folha do Padeiro: resumo do que precisa ser assado agora.</p>
        </div>
        <PrintButton />
      </div>

      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-sm border border-gray-100 dark:border-[#333] overflow-hidden transition-colors p-8">
        {!hasItemsToProduce ? (
          <div className="text-center py-12">
            <div className="mx-auto w-20 h-20 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Produção Zerada!</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Nenhum pedido pendente ou em produção no momento.</p>
          </div>
        ) : (
          <div>
            <div className="mb-8 pb-4 border-b-2 border-dashed border-gray-200 dark:border-[#444]">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Resumo Consolidado</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total de itens que a cozinha precisa preparar para atender os pedidos atuais.</p>
            </div>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {Object.entries(productionList)
                .sort((a, b) => b[1] - a[1]) // Ordena do maior para o menor
                .map(([breadName, qty]) => (
                  <li key={breadName} className="flex justify-between items-end border-b border-gray-100 dark:border-[#333] pb-2">
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">{breadName}</span>
                    <span className="text-2xl font-bold text-[#E57813] dark:text-[#F3C49B]">{qty}<span className="text-sm text-gray-500 dark:text-gray-400 font-normal ml-1">unid.</span></span>
                  </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
