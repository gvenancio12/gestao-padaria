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
  for (const bread of initialBreads) {
    const created = await prisma.bread.create({
      data: bread,
    });
    console.log(`✅ Adicionado: ${created.name}`);
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
