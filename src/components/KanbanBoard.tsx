'use client';

import { useState, useTransition } from 'react';
import { updateOrderStatus } from '@/actions/orders';

type OrderItem = {
  quantity: number;
  breadName: string;
};

export type Order = {
  id: string;
  customerName: string;
  status: 'PENDENTE' | 'EM_PRODUCAO' | 'PRONTO' | 'CONCLUIDO';
  totalAmount: string;
  createdAt: string;
  items: OrderItem[];
};

type ColumnType = 'PENDENTE' | 'EM_PRODUCAO' | 'PRONTO' | 'CONCLUIDO';

const columns: { id: ColumnType; title: string; color: string }[] = [
  { id: 'PENDENTE', title: 'Pendente', color: 'border-l-4 border-l-red-500' },
  { id: 'EM_PRODUCAO', title: 'Em Produção', color: 'border-l-4 border-l-yellow-500' },
  { id: 'PRONTO', title: 'Pronto para Retirada', color: 'border-l-4 border-l-emerald-500' },
  { id: 'CONCLUIDO', title: 'Concluído', color: 'border-l-4 border-l-blue-500' },
];

export function KanbanBoard({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isPending, startTransition] = useTransition();

  const handleDragStart = (e: React.DragEvent, orderId: string) => {
    e.dataTransfer.setData('orderId', orderId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessário para permitir o drop
  };

  const handleDrop = (e: React.DragEvent, newStatus: ColumnType) => {
    e.preventDefault();
    const orderId = e.dataTransfer.getData('orderId');
    if (!orderId) return;

    // Atualiza otimista na tela (UI)
    setOrders((prev) => 
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    // Dispara a Server Action em background
    startTransition(async () => {
      const result = await updateOrderStatus(orderId, newStatus);
      if (!result.success) {
        // Se der erro no servidor, reverte o estado
        alert('Erro ao mover o pedido: ' + result.error);
        setOrders(initialOrders);
      }
    });
  };

  return (
    <div className="flex gap-6 items-start h-full pb-4">
      {columns.map((col) => (
        <div 
          key={col.id}
          className="flex-shrink-0 w-80 bg-gray-50 dark:bg-[#1E1E1E] rounded-xl flex flex-col h-[70vh] border border-gray-200 dark:border-[#333] transition-colors"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, col.id)}
        >
          {/* Cabeçalho da Coluna */}
          <div className="p-4 border-b border-gray-200 dark:border-[#333] font-bold text-gray-700 dark:text-gray-200 flex justify-between items-center transition-colors">
            {col.title}
            <span className="bg-gray-200 dark:bg-[#333] text-gray-600 dark:text-gray-400 text-xs py-1 px-2 rounded-full transition-colors">
              {orders.filter((o) => o.status === col.id).length}
            </span>
          </div>

          {/* Lista de Cards */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {orders
              .filter((o) => o.status === col.id)
              .map((order) => (
                <div
                  key={order.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, order.id)}
                  className={`bg-white dark:bg-[#2A2A2A] p-4 rounded-lg shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${col.color}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-900 dark:text-white transition-colors">{order.customerName}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors">
                      {new Date(order.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <ul className="text-sm text-gray-600 dark:text-gray-300 mb-3 transition-colors space-y-1">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{item.quantity}x {item.breadName}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-[#444] transition-colors">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total:</span>
                    <span className="font-bold text-[#E57813] dark:text-[#F3C49B]">
                      R$ {Number(order.totalAmount).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              ))}
              
            {orders.filter((o) => o.status === col.id).length === 0 && (
              <div className="text-center p-4 text-gray-400 dark:text-gray-500 text-sm border-2 border-dashed border-gray-200 dark:border-[#444] rounded-lg">
                Solte pedidos aqui
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
