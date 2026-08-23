'use client';

import { useActionState, useRef, useState, useEffect } from 'react';
import { createBread } from '@/actions/bread';

export function BreadForm() {
  const [state, formAction, isPending] = useActionState(createBread, null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Estado para armazenar a prévia da imagem selecionada
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Limpa o formulário e a foto em caso de sucesso
  useEffect(() => {
    if (state?.success && formRef.current) {
      formRef.current.reset();
      setImagePreview(null);
    }
  }, [state?.success]);

  // Função para criar a URL da prévia da imagem na tela
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-sm p-6 border border-gray-100 dark:border-[#333333] transition-colors">
      <h2 className="text-xl font-bold text-[#7A2A03] dark:text-[#F3C49B] mb-6 transition-colors">Cadastrar Novo Pão</h2>
      
      {/* O formulário agora engloba toda a estrutura Flexbox para capturar a imagem junto com o texto */}
      <form ref={formRef} action={formAction} className="flex flex-col md:flex-row gap-8">
        
        {/* ÁREA ESQUERDA: Upload de Imagem */}
        <div className="w-full md:w-[250px] shrink-0">
          <div className="relative h-full min-h-[250px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-[#444] rounded-xl p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors overflow-hidden group">
            
            <input 
              type="file" 
              name="image" // Importante: Esse é o nome que chegará no seu backend
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              accept="image/*"
              onChange={handleImageChange}
            />

            {imagePreview ? (
                // Mostra a prévia da imagem
               <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
                // Mostra o ícone de upload
              <div className="flex flex-col items-center pointer-events-none z-0">
                <img src="/plus_icon.webp" alt="Adicionar" className="w-16 h-16 mb-3 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-gray-600 dark:text-[#F3C49B] font-medium transition-colors">Adicionar Foto</span>
                <span className="text-gray-400 dark:text-gray-500 text-xs mt-1 text-center transition-colors">Recomendado: 800x800px<br/>(PNG ou JPG)</span>
              </div>
            )}
          </div>
        </div>

        {/* ÁREA DIREITA: Campos de Texto Existentes */}
        <div className="flex-1 space-y-4">
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
        </div>
      </form>
    </div>
  );
}