# Donatos - Gestão de Pedidos Artesanais

Este é o repositório principal do sistema de Gestão de Pedidos da Padaria Donatos, construído com **Next.js 15**, **Tailwind CSS** e **Prisma** (PostgreSQL).

## Como rodar o projeto localmente (Passo a Passo para a Equipe)

Para que o projeto funcione na sua máquina (especialmente a parte de login e banco de dados), siga exatamente os passos abaixo:

### 1. Pré-requisitos
- Ter o [Node.js](https://nodejs.org/) instalado.
- Ter o [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e **aberto/rodando** no seu computador.

### 2. Configurar o Banco de Dados
O banco de dados roda localmente através do Docker. No terminal, dentro da pasta do projeto, execute:
```bash
docker compose up -d db
```

### 3. Configurar as Variáveis de Ambiente
Crie um arquivo chamado `.env` na raiz do projeto e copie o conteúdo do arquivo `TEMPLATE.env` para ele. O arquivo `.env` deve ficar assim:
```env
POSTGRES_USER=gestao_padaria
POSTGRES_PASSWORD=gestao_padaria
POSTGRES_DB=gestao_padaria_db

DATABASE_URL="postgresql://gestao_padaria:gestao_padaria@localhost:5432/gestao_padaria_db?schema=public"
```

### 4. Instalar as Dependências
Baixe todos os pacotes do projeto rodando:
```bash
npm install
```

### 5. Sincronizar o Prisma (Criar tabelas e gerar o cliente)
Para criar as tabelas no seu banco de dados local e gerar o cliente tipado do Prisma, rode:
```bash
npx prisma db push
npx prisma generate
```

### 6. Iniciar o Servidor
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
  - Kanban de Pedidos (Drag & Drop)
  - Dashboard sincronizado em tempo real
  - Relatório de Produção (Folha do Padeiro)
  - Histórico de Auditoria de ações
  - Autenticação JWT com cookies seguros
