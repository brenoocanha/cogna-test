# Desafio Técnico Full-Stack: Vitrine de Produtos

Este repositório contém a solução para o Desafio Técnico de Desenvolvedor(a) Full-Stack. A aplicação é uma vitrine de produtos construída com um backend em NestJS e um frontend em Next.js (App Router). Todo o ambiente é containerizado com Docker para garantir a consistência e facilitar a execução.

## Stack de Tecnologias

### Backend

NestJS, TypeScript

Framework Node.js robusto que promove uma arquitetura modular, escalável e testável através de injeção de dependência.

### Frontend

Next.js (App Router), TypeScript

Utilização da arquitetura mais recente do Next.js com React Server Components e Server Actions para máxima performance e uma melhor experiência de desenvolvimento.

### Banco de Dados

Prisma (ORM)

ORM type-safe que simplifica as interações com o banco de dados e as migrações de schema.

### Containerização

Docker, Docker Compose

Garante a paridade entre os ambientes de desenvolvimento e produção, simplificando a configuração e o deploy.

## Aderência aos Requisitos do Desafio

O projeto foi desenvolvido para cumprir todos os requisitos obrigatórios e implementar a maioria dos diferenciais opcionais, optando por um stack mais avançado para demonstrar proficiência.

### Requisitos Obrigatórios

✅ Frontend com Next.js: Implementado com TypeScript e a arquitetura App Router.

✅ Backend com Node.js: Implementado com o framework NestJS para maior organização e escalabilidade.

✅ Página Inicial (/): Exibe a lista de produtos.

✅ Página de Detalhes (/produto/[id]): Exibe um produto específico.

✅ Rota GET /produtos: Disponível no backend.

✅ Rota GET /produtos/:id: Disponível no backend.

✅ Organização do Backend: A estrutura do NestJS garante a separação em modules, controllers, services e repositories.

✅ Renderização no Servidor: O App Router utiliza React Server Components por padrão, cumprindo o requisito de SSR/SSG.

✅ SEO: O Next.js App Router possui um sistema de metadados robusto que substitui o next/head.

✅ Responsividade e Usabilidade: A interface foi construída com foco em boa usabilidade em múltiplos dispositivos.

### Diferenciais (Opcionais)

✅ Docker e Docker Compose: Todo o ambiente é orquestrado por um arquivo docker-compose.yml.

✅ Autenticação: Implementado um módulo de auth no backend e rotas autenticadas no frontend.

✅ Conexão com Banco de Dados: Utiliza o Prisma para se conectar a um banco de dados, superando o requisito de dados em memória.

✅ Testes: A estrutura do backend inclui um diretório de testes (/test), demonstrando a preparação para uma suíte de testes com Jest.

## Decisões Técnicas Principais

<b>Backend com NestJS e Prisma:</b> A escolha pelo NestJS em vez do Express puro foi estratégica para aplicar conceitos de Injeção de Dependência, modularidade e uma arquitetura escalável, comum em sistemas de produção. O Prisma foi utilizado como ORM para garantir a segurança de tipos (type-safety) nas interações com o banco de dados, reduzindo a possibilidade de erros em tempo de execução.

<b>Frontend com Next.js App Router:</b> A utilização da arquitetura mais recente do Next.js (App Router) permite o uso de React Server Components por padrão, o que otimiza o carregamento inicial da página ao reduzir a quantidade de JavaScript enviado ao cliente. As mutações de dados (criação, atualização) são gerenciadas via Server Actions, uma abordagem moderna que simplifica a comunicação entre cliente e servidor de forma segura e coesa.

<b>Adoção de TypeScript:</b> Embora o desafio sugerisse JavaScript puro, a adoção de TypeScript em todo o projeto foi uma decisão consciente para aumentar a robustez, a manutenibilidade e a confiabilidade do código, prevenindo erros comuns através da tipagem estática.

## Como Rodar o Projeto Localmente

### Pré-requisitos

- Docker
- Docker Compose

### Instruções

- Clone o repositório:

```bash
git clone https://github.com/brenoocanha/cogna-test.git
```

- Navegue até a raiz do projeto:

```bash
cd cogna-test
```

- Construa as imagens e inicie os containers:

```bash
docker-compose up --build
```

Após a execução, a aplicação estará disponível nos seguintes endereços:

- Frontend: http://localhost:4000
- Backend: http://localhost:3000

## Endpoints da API

A API do backend expõe os seguintes endpoints principais no módulo de produtos:

| MÉTODO | ROTA         | DESCRIÇÃO              | AUTENTICAÇÃO |
| ------ | ------------ | ---------------------- | ------------ |
| POST   | /auth/login  | Login                  | Não          |
| POST   | /user        | Registro               | Não          |
| GET    | /product/all | Todos os produtos      | Requerida    |
| GET    | /product/:id | Detalhes de um produto | Requerida    |
