import { prisma } from '../src/lib/prisma';

const initialBreads = [
  { name: 'Pão Francês', category: 'Tradicional', unit: 'kg', price: 14.00, description: 'Pão francês fresquinho e crocante' },
  { name: 'Pão de Forma', category: 'Tradicional', unit: 'un.', price: 8.50, description: 'Pão de forma macio ideal para sanduíches' },
  { name: 'Pão de Leite', category: 'Tradicional', unit: 'un.', price: 9.00, description: 'Pão de leite adocicado e super macio' },
  { name: 'Pão Integral', category: 'Especial', unit: 'un.', price: 10.00, description: 'Pão integral rico em fibras' },
  { name: 'Pão de Hambúrguer', category: 'Especial', unit: 'pacote', price: 12.00, description: 'Pacote com pães de hambúrguer macios' },
  { name: 'Pão de Hot Dog', category: 'Especial', unit: 'pacote', price: 11.00, description: 'Pacote com pães para cachorro quente' },
  { name: 'Pão de Queijo', category: 'Especial', unit: 'kg', price: 28.00, description: 'Legítimo pão de queijo mineiro' },
  { name: 'Brioche', category: 'Especial', unit: 'un.', price: 8.00, description: 'Pão brioche amanteigado clássico francês' },
  { name: 'Baguete', category: 'Especial', unit: 'un.', price: 7.00, description: 'Baguete tradicional com casca crocante' },
  { name: 'Bisnaguinha', category: 'Tradicional', unit: 'pacote', price: 9.50, description: 'Pacote de bisnaguinhas super macias' },
];

async function main() {
  console.log('🌱 Iniciando o seed...');
  
  // Seed Breads
  const existingBreads = await prisma.bread.count();
  if (existingBreads === 0) {
    for (const bread of initialBreads) {
      const created = await prisma.bread.create({
        data: bread,
      });
      console.log(`✅ Adicionado: ${created.name}`);
    }
  }

  // Seed Orders
  const existingOrders = await prisma.order.count();
  if (existingOrders === 0) {
    const user = await prisma.user.findFirst({ where: { role: 'CLIENTE' } });
    const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    const breads = await prisma.bread.findMany({ take: 3 });

    const customerId = user?.id || admin?.id;

    if (customerId && breads.length >= 3) {
      await prisma.order.create({
        data: {
          customerId,
          status: 'PENDENTE',
          totalAmount: breads[0].price.toNumber() * 2,
          items: {
            create: [
              { breadId: breads[0].id, quantity: 2, price: breads[0].price }
            ]
          }
        }
      });
      console.log('✅ Pedido Pendente Adicionado');

      await prisma.order.create({
        data: {
          customerId,
          status: 'EM_PRODUCAO',
          totalAmount: breads[1].price.toNumber() * 5,
          items: {
            create: [
              { breadId: breads[1].id, quantity: 5, price: breads[1].price }
            ]
          }
        }
      });
      console.log('✅ Pedido Em Produção Adicionado');

      await prisma.order.create({
        data: {
          customerId,
          status: 'PRONTO',
          totalAmount: breads[2].price.toNumber() * 1,
          items: {
            create: [
              { breadId: breads[2].id, quantity: 1, price: breads[2].price }
            ]
          }
        }
      });
      console.log('✅ Pedido Pronto Adicionado');
    }
  }

  console.log('✨ Seed finalizado!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
