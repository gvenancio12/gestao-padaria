'use client';

import { useActionState, useState } from 'react';
import { loginUser, registerUser } from '@/actions/auth';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const [state, formAction, isPending] = useActionState(
    isLogin ? loginUser : registerUser,
    null
  );

  return (
    <div className="w-full max-w-md bg-[#fafafa] dark:bg-[#1E1E1E] rounded-2xl shadow-xl p-10 mx-4 transition-colors">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#7A2A03] dark:text-[#F3C49B] mb-2 font-serif transition-colors">
          Fábrica de Pães
        </h1>
        <p className="text-[#DE773B] dark:text-[#E0C097] font-medium transition-colors">
          Gestão de Pedidos Artesanais
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#7A2A03] dark:text-[#E0C097] mb-1 transition-colors"
          >
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            className="w-full px-4 py-3 rounded-lg border border-[#F3C49B] dark:border-[#444] bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white placeholder-[#F3C49B] dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DE773B] transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#7A2A03] dark:text-[#E0C097] mb-1 transition-colors"
          >
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-4 py-3 rounded-lg border border-[#F3C49B] dark:border-[#444] bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#DE773B] transition-colors"
          />
        </div>

        {state?.error && (
          <p className="text-red-500 dark:text-red-400 text-sm font-medium text-center">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#E57813] hover:bg-[#C9660D] text-white font-bold py-3 px-4 rounded-lg transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? 'Aguarde...' : isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-[#DE773B] dark:text-[#D46200] hover:text-[#7A2A03] dark:hover:text-[#F3C49B] font-medium transition-colors"
        >
          {isLogin
            ? 'Não tem uma conta? Cadastre-se'
            : 'Já tem uma conta? Entre'}
        </button>
      </div>
    </div>
  );
}
