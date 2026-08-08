'use client';

import { useActionState, useState } from 'react';
import { loginUser, registerUser } from '@/actions/auth';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  // Use separate hooks to prevent stale actions when switching modes
  const [loginState, loginFormAction, isLoginPending] = useActionState(loginUser, null);
  const [registerState, registerFormAction, isRegisterPending] = useActionState(registerUser, null);

  const state = isLogin ? loginState : registerState;
  const formAction = isLogin ? loginFormAction : registerFormAction;
  const isPending = isLogin ? isLoginPending : isRegisterPending;

  return (
    <div className="w-full max-w-md bg-[#fafafa] dark:bg-[#1E1E1E] rounded-2xl shadow-xl p-10 mx-4 transition-colors">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-[#7A2A03] dark:text-[#F3C49B] mb-2 font-serif transition-colors">
          Fábrica de Pães
        </h1>
        <p className="text-[#DE773B] dark:text-[#E0C097] font-medium transition-colors">
          Gestão de Pedidos Artesanais
        </p>
      </div>

      <div className="flex justify-center space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={`pb-2 px-4 font-semibold text-lg transition-colors ${
            isLogin 
              ? 'text-[#E57813] dark:text-[#F3C49B] border-b-2 border-[#E57813] dark:border-[#F3C49B]' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border-b-2 border-transparent'
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={`pb-2 px-4 font-semibold text-lg transition-colors ${
            !isLogin 
              ? 'text-[#E57813] dark:text-[#F3C49B] border-b-2 border-[#E57813] dark:border-[#F3C49B]' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border-b-2 border-transparent'
          }`}
        >
          Cadastro
        </button>
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
          {isPending ? 'Aguarde...' : isLogin ? 'Entrar no Sistema' : 'Criar minha Conta'}
        </button>
      </form>
    </div>
  );
}
