'use client';

import { useState, useTransition } from 'react';
import { togglePaymentStatus } from '@/actions/orders';
import { Order } from './KanbanBoard';

interface Props {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsModal({ order, isOpen, onClose }: Props) {
  const [isPending, startTransition] = useTransition();

  if (!isOpen || !order) return null;

  const handleTogglePayment = () => {
    const newStatus = order.paymentStatus === 'PAGO' ? 'PENDENTE' : 'PAGO';
    
    startTransition(async () => {
      const res = await togglePaymentStatus(order.id, newStatus);
      if (!res.success) {
        alert(res.error);
      }
      // O Next.js fará o revalidatePath e atualizará o card automaticamente
      onClose(); // Ou mantém aberto e deixa atualizar (mas fecharemos por simplicidade)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-[#333] flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Detalhes do Pedido</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Info Customer */}
          <div className="bg-gray-50 dark:bg-[#2A2A2A] p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Cliente</p>
            <p className="font-bold text-gray-900 dark:text-white text-lg">{order.customerName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Data: {new Date(order.createdAt).toLocaleDateString('pt-BR')} às {new Date(order.createdAt).toLocaleTimeString('pt-BR')}
            </p>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Itens do Pedido</h3>
            <ul className="space-y-2 border border-gray-100 dark:border-[#333] rounded-lg p-3">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-[#333] pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-700 dark:text-gray-300">
                    <span className="font-bold mr-2 text-gray-900 dark:text-white">{item.quantity}x</span> 
                    {item.breadName}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Totals and Payment */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-[#333]">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total a pagar</p>
              <p className="text-2xl font-bold text-[#E57813] dark:text-[#F3C49B]">
                R$ {Number(order.totalAmount).toFixed(2).replace('.', ',')}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status Pagamento</p>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                order.paymentStatus === 'PAGO' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' 
                  : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
              }`}>
                {order.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-[#252525] border-t border-gray-100 dark:border-[#333] flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#333] border border-gray-200 dark:border-[#444] rounded-lg hover:bg-gray-50 dark:hover:bg-[#444]">
            Fechar
          </button>
          
          <button 
            onClick={handleTogglePayment}
            disabled={isPending}
            className={`px-4 py-2 text-sm font-medium rounded-lg text-white ${
              order.paymentStatus === 'PAGO' 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            } disabled:opacity-50`}
          >
            {isPending ? 'Atualizando...' : order.paymentStatus === 'PAGO' ? 'Marcar como Pendente' : 'Marcar como Pago'}
          </button>
        </div>
      </div>
    </div>
  );
}
