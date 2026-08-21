# Donatos - Gestão de Pedidos Artesanais

Este é o repositório principal do sistema de Gestão de Pedidos da Padaria Donatos, construído com **Next.js 15**, **Tailwind CSS** e **Prisma** (PostgreSQL).

## Como rodar o projeto localmente (Passo a Passo para a Equipe)

Para que o projeto funcione na sua máquina, siga exatamente os passos abaixo:

### 1. Pré-requisitos
- Ter o [Node.js](https://nodejs.org/) instalado.
- Ter o Git para versionamento.

### 2. Configurar as Variáveis de Ambiente
Nosso banco de dados agora é centralizado na nuvem (Supabase), dispensando o uso do Docker local.
Crie um arquivo chamado `.env` na raiz do projeto, copie o conteúdo de `TEMPLATE.env` e substitua a tag pela senha oficial:
```env
# Connect to Postgres via the shared transaction-mode pooler (IPv4-only)
DATABASE_URL="postgresql://postgres.iqzjwatexsdsysvhlqdo:[COLOQUE_A_SENHA_AQUI]@[aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true](https://aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true)"

# Connect to Postgres via the shared session-mode pooler (used for migrations)
DIRECT_URL="postgresql://postgres.iqzjwatexsdsysvhlqdo:[COLOQUE_A_SENHA_AQUI]@[aws-0-us-west-2.pooler.supabase.com:5432/postgres](https://aws-0-us-west-2.pooler.supabase.com:5432/postgres)"
```

### 3. Instalar as Dependências e Prisma
Baixe todos os pacotes do projeto e gere o cliente do banco de dados rodando:
```bash
npm install
npx prisma generate
```

### 4. Iniciar o Servidor
Por fim, inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o sistema rodando.

---

## Estrutura Atual
- **Vitrine do Cliente:** A tela inicial (`/`) agora é o catálogo da loja (Vitrine), exibindo os pães disponíveis. O login e cadastro foram movidos para `/login`.
- **Painel Administrativo:** Após logado, os administradores têm acesso à rota `/dashboard`.
- **Funcionalidades Prontas:** 
  - Banco de Dados em Nuvem (Supabase) configurado e sincronizado
  - Kanban de Pedidos (Drag & Drop)
  - Dashboard sincronizado em tempo real
  - Relatório de Produção (Folha do Padeiro)
  - Histórico de Auditoria de ações
  - Autenticação JWT com cookies seguros
