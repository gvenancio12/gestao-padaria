import { getOrders } from '@/actions/orders';
import { KanbanBoard } from '@/components/KanbanBoard';

export default async function PedidosPage() {
  const orders = await getOrders();

  // Serializar os dados para passar ao Client Component de forma limpa (sem objetos Date que o Next reclama no Client Component se n for serializado)
  const serializedOrders = orders.map(order => ({
    id: order.id,
    customerName: order.customer.name || order.customer.email,
    status: order.status,
    paymentStatus: order.paymentStatus,
    totalAmount: order.totalAmount.toString(),
    createdAt: order.createdAt.toISOString(),
    items: order.items.map(item => ({
      quantity: item.quantity,
      breadName: item.bread.name
    }))
  }));

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold font-serif text-[#1F2937] dark:text-white transition-colors">Quadro de Pedidos</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 transition-colors">Arraste os pedidos entre as colunas para atualizar a produção</p>
      </div>

      <div className="flex-1 overflow-x-auto min-h-[600px]">
        <KanbanBoard initialOrders={serializedOrders} />
      </div>
    </div>
  );
}
