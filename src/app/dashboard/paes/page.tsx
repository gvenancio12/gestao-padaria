import { getBreads } from '@/actions/bread';
import { BreadForm } from '@/components/BreadForm';
import { BreadAvailabilityToggle } from '@/components/BreadAvailabilityToggle';

export default async function PaesPage() {
  const breads = await getBreads();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold font-serif text-[#1F2937] dark:text-white transition-colors">Catálogo de Pães</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 transition-colors">Gerencie os pães, preços e disponibilidade do cardápio</p>
      </div>

      {/* Formulário de Cadastro */}
      <BreadForm />

      {/* Listagem (Tabela) */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-sm border border-gray-100 dark:border-[#333333] transition-colors overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-[#333333] flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#7A2A03] dark:text-[#F3C49B] transition-colors">Produtos Cadastrados ({breads.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525] text-gray-500 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-[#333333] transition-colors">
                <th className="px-6 py-4 font-medium">Produto</th>
                <th className="px-6 py-4 font-medium">Categoria</th>
                <th className="px-6 py-4 font-medium">Unidade</th>
                <th className="px-6 py-4 font-medium">Preço</th>
                <th className="px-6 py-4 font-medium text-center">Disponível?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#333333]">
              {breads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    Nenhum pão cadastrado ainda.
                  </td>
                </tr>
              ) : (
                breads.map((bread) => (
                  <tr key={bread.id} className="hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white transition-colors">{bread.name}</div>
                      {bread.description && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{bread.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        bread.category === 'Tradicional' 
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' 
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      }`}>
                        {bread.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm">
                      {bread.unit}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      R$ {Number(bread.price).toFixed(2).replace('.', ',')}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <BreadAvailabilityToggle id={bread.id} initialAvailable={bread.isAvailable} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
