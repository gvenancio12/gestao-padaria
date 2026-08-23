import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { getSession } from '@/lib/session';

export default async function StorefrontPage() {
  const session = await getSession();

  // UC03: Consultar Pães Disponíveis (Apenas os que têm isAvailable = true)
  const availableBreads = await prisma.bread.findMany({
    where: { isAvailable: true },
    orderBy: { name: 'asc' },
  });

  return (
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <header className="relative z-10 px-4 py-6 lg:px-8">
          <nav className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-warm-brown rounded-full flex items-center justify-center">
                <span className="text-cream font-semibold text-xs">D</span>
              </div>
              <span className="text-warm-brown font-semibold text-lg">Donato&apos;s</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#products" className="text-warm-brown hover:text-sage-green transition-colors">Catálogo</a>
              <a href="#about" className="text-warm-brown hover:text-sage-green transition-colors">Sobre nós</a>
              <a href="#contact" className="text-warm-brown hover:text-sage-green transition-colors">Contato</a>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/hero_image.png"
              alt="Pães artesanais Donato's"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35"></div>
          </div>

          <div className="relative z-10 text-center px-4 w-full flex flex-col items-center">
            <h1 className="text-cream mb-4 drop-shadow-lg font-island text-[112px] p-[0px] whitespace-nowrap leading-none">
              Donatos a arte de fazer pães</h1>
            <p className="text-cream/90 mb-3 w-full max-w-5xl mx-auto leading-relaxed font-bacasime text-[24px] text-center">
              Conheça nosso sabor, experimente a maciez de nossos pães. Desfrute da líder em pães para hamburguer na região do Cariri e conheça nosso cardápio adaptativo para todo e qualquer tipo de cliente. Não perca tempo! Faça já o seu pedido!
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center bg-warm-brown hover:bg-warm-brown/90 text-cream px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ir para o carrinho
            </Link>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16 lg:py-24 px-4 lg:px-8 bg-warm-beige">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-island text-[64px] text-warm-brown mb-4 leading-tight">
                Conheça o nosso catálogo
              </h2>
              <p className="font-bacasime text-[20px] text-warm-brown/80 max-w-2xl mx-auto leading-relaxed">
                Nossa marca está presente nas melhores hamburguerias e lanchonetes do Cariri
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {availableBreads.map((bread) => (
                <div key={bread.id} className="bg-cream rounded-lg shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className="p-0 flex flex-col flex-1 h-full">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      {/* Usando uma imagem estática temporária até o banco ter fotos */}
                      <img
                        src="/product_placeholder.png" 
                        alt={bread.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col flex-1 px-6 pt-4 pb-0">
                      <h3 className="text-lg text-warm-brown text-center mb-3">
                        {bread.name}
                      </h3>
                      <Link
                        href="/login"
                        className="flex items-center justify-center w-full bg-warm-brown hover:bg-warm-brown/90 text-cream py-3 rounded-none rounded-b-lg shadow-none mt-auto"
                      >
                        Faça o seu pedido
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 lg:py-24 px-4 lg:px-8 bg-sage-green/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="font-island text-[64px] text-warm-brown mb-6 leading-tight">
                  Sobre nós
                </h2>
                <div className="space-y-5 font-bacasime text-[20px] text-warm-brown/90 leading-relaxed">
                  <p>
                    Você já conhece a Donato&apos;s? Líder no segmento de pães para hamburguer na região do Cariri,
                    eles atendem cerca de 10 municípios, e contando com um cardápio adaptativo para todo e qualquer
                    tipo de estabelecimento.
                  </p>
                  <p>
                    Com pães a partir de 1,00 real, a Donato&apos;s entrega muito mais que pão, ela entrega a solução
                    completa para a sua hamburgueria! Especialistas indicam que a qualidade do pão representa 60%
                    do lanche, e com um processo fabril tecnológico, higiênico, e uma entrega inteligente, a marca
                    está presente nas melhores hamburguerias e lanchonetes da região do Cariri.
                  </p>
                  <p>
                    Sem contar, nos insumos usados, que são de altíssima qualidade, se apresentando com um pão fresco
                    de produção diária. Eles também comercializam para o público em geral, bastando entrar em contato
                    pelo app ou whatsapp... Aí é só realizar seu pedido, e curtir sua noite do Hamburguer!
                  </p>
                  <p className="font-semibold text-warm-brown">
                    Donato&apos;s a arte de fazer PÃES!
                  </p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative w-full h-[500px] rounded-2xl shadow-soft overflow-hidden">
                  <img
                    src="/donatos_logo.png"
                    alt="Logo Donato's"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-warm-brown text-cream py-12 px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-cream rounded-full flex items-center justify-center">
                    <span className="text-warm-brown font-semibold text-sm">D</span>
                  </div>
                  <span className="text-cream font-semibold">Donato&apos;s</span>
                </div>
                <p className="text-cream/80 leading-relaxed">
                  A arte de fazer pães. Líderes no segmento de pães para hamburguer na região do Cariri.
                </p>
              </div>

              <div>
                <h3 className="text-lg mb-4">Contato</h3>
                <div className="space-y-2 text-cream/80">
                  <p>📍 Juazeiro do Norte - Cariri - CE</p>
                  <p>📞 +55 88 8817-0128</p>
                  <p>✉️ Donatoscariri@gmail.com</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg mb-4">Atendimento</h3>
                <div className="space-y-2 text-cream/80">
                  <p>Segunda - Sexta: 7:00 - 20:00</p>
                  <p>Sábado - Domingo: 8:00 - 21:00</p>
                  <p className="text-sage-green">Pão fresco todos os dias!</p>
                </div>
              </div>
            </div>

            <div className="border-t border-cream/20 mt-8 pt-8 text-center text-cream/60">
              <p>&copy; 2026 Donato&apos;s. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    );
}
