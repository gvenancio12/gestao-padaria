# Fábrica de Pães - Gestão de Pedidos Artesanais

Este é o repositório principal do sistema de Gestão de Pedidos da Fábrica de Pães, construído com **Next.js**, **Tailwind CSS** e **Prisma** (PostgreSQL).

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

### 5. Sincronizar o Prisma (Criar tabelas)
Para criar as tabelas no seu banco de dados local (como a tabela de Usuários), rode:
```bash
npx prisma db push
```

### 6. Iniciar o Servidor
Por fim, inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o sistema rodando.

---

## Estrutura Atual
- **Autenticação:** O sistema já possui um fluxo completo de Login e Cadastro seguros utilizando JWT (salvo em cookies) e criptografia de senhas com `bcryptjs`.
- **Rotas:** A tela inicial (`/`) é o Login/Cadastro. Após logado, o usuário é direcionado ao painel restrito (`/dashboard`).
