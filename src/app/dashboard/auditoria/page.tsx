import { getAuditLogs } from '@/actions/audit';

export default async function AuditoriaPage() {
  const logs = await getAuditLogs();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold font-serif text-[#1F2937] dark:text-white transition-colors">Auditoria e Logs</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 transition-colors">Histórico de ações realizadas no sistema.</p>
      </div>

      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-sm border border-gray-100 dark:border-[#333] overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#2A2A2A] text-gray-600 dark:text-gray-300 text-sm border-b border-gray-100 dark:border-[#333] transition-colors">
                <th className="px-6 py-4 font-semibold">Data / Hora</th>
                <th className="px-6 py-4 font-semibold">Usuário</th>
                <th className="px-6 py-4 font-semibold">Ação</th>
                <th className="px-6 py-4 font-semibold">Entidade</th>
                <th className="px-6 py-4 font-semibold">Detalhes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#333] text-sm text-gray-700 dark:text-gray-300 transition-colors">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    Nenhum registro encontrado.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {log.createdAt.toLocaleDateString('pt-BR')} às {log.createdAt.toLocaleTimeString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {log.user.name || log.user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        log.action === 'CRIOU' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        log.action === 'DELETOU' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        log.action === 'MOVEU' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{log.entity}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 max-w-xs truncate" title={log.details || ''}>
                      {log.details || '-'}
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
