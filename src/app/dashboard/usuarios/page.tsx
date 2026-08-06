'use client';

import { useActionState } from 'react';
import { createAdmin } from '@/actions/admin';

export default function UsuariosPage() {
  const [state, formAction, isPending] = useActionState(createAdmin, null);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-serif text-[#1F2937] dark:text-white transition-colors">Gerenciar Usuários</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 transition-colors">Adicione novos administradores para gerenciar o sistema</p>
      </div>

      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-sm p-8 border border-gray-100 dark:border-[#333333] transition-colors">
        <h2 className="text-xl font-bold text-[#7A2A03] dark:text-[#F3C49B] mb-6 transition-colors">Adicionar Novo Administrador</h2>
        
        <form action={formAction} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Nome Completo</label>
            <input 
              type="text" 
              name="name" 
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#DE773B] transition-colors"
              placeholder="João da Silva"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">E-mail</label>
            <input 
              type="email" 
              name="email" 
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#DE773B] transition-colors"
              placeholder="joao@fabricadepaes.com.br"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Senha Provisória</label>
            <input 
              type="password" 
              name="password" 
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#DE773B] transition-colors"
              placeholder="******"
            />
          </div>

          {state?.error && (
            <p className="text-red-500 dark:text-red-400 text-sm font-medium">{state.error}</p>
          )}
          {state?.success && (
            <p className="text-emerald-500 dark:text-emerald-400 text-sm font-medium">{state.success}</p>
          )}

          <button 
            type="submit" 
            disabled={isPending}
            className="mt-4 bg-[#E57813] hover:bg-[#C9660D] text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? 'Cadastrando...' : 'Criar Administrador'}
          </button>
        </form>
      </div>
    </div>
  );
}
