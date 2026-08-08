'use client';

import { useActionState, useRef } from 'react';
import { createBread } from '@/actions/bread';

export function BreadForm() {
  const [state, formAction, isPending] = useActionState(createBread, null);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear form on success
  if (state?.success && formRef.current) {
    formRef.current.reset();
  }

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-sm p-6 border border-gray-100 dark:border-[#333333] transition-colors">
      <h2 className="text-xl font-bold text-[#7A2A03] dark:text-[#F3C49B] mb-6 transition-colors">Cadastrar Novo Pão</h2>
      
      <form ref={formRef} action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Nome</label>
            <input 
              type="text" 
              name="name" 
              required
              placeholder="Ex: Sonho de Doce de Leite"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#DE773B] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Preço (R$)</label>
            <input 
              type="text" 
              name="price" 
              required
              placeholder="Ex: 14,50"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#DE773B] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Categoria</label>
            <select 
              name="category"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#DE773B] transition-colors"
            >
              <option value="Tradicional">Tradicional</option>
              <option value="Especial">Especial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Unidade</label>
            <select 
              name="unit"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#DE773B] transition-colors"
            >
              <option value="un.">Unidade (un.)</option>
              <option value="kg">Quilograma (kg)</option>
              <option value="pacote">Pacote</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Descrição</label>
          <textarea 
            name="description" 
            rows={2}
            placeholder="Breve descrição do produto..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#DE773B] transition-colors"
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
          {isPending ? 'Salvando...' : 'Cadastrar Pão'}
        </button>
      </form>
    </div>
  );
}
