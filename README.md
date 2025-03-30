# Symplifika: Documentação Completa do Projeto

Este documento fornece uma visão geral completa do projeto Symplifika, incluindo a estrutura de diretórios, arquivos importantes, instruções de configuração e informações sobre como contribuir.

## Visão Geral

Symplifika é uma aplicação completa projetada para aumentar a produtividade do usuário através de expansão de texto, gerenciamento de atalhos e funcionalidades de autopreenchimento com inteligência artificial. O projeto é composto por três partes principais:

1.  **Backend:** Uma API Node.js construída com Express.js, Prisma ORM e outras bibliotecas.
2.  **Frontend:** Uma interface web construída (especificar framework aqui, exemplo: com React.js).
3.  **Extensão do Chrome:** Uma extensão para navegadores Chrome que interage com o backend e injeta funcionalidades nas páginas web.

## Estrutura de Diretórios

```
symplifika/
├── .gitignore              # Arquivo .gitignore raiz
├── backend/                 # Diretório do backend
│   ├── .gitignore          # .gitignore do backend
│   ├── README.md           # Documentação da API Backend
│   ├── api/                # Rotas específicas da API
│   │   └── openai/
│   │       └── generate.js # Lógica para geração de texto com OpenAI
│   ├── prisma/             # Configurações do Prisma ORM
│   │   ├── migrations/     # Migrações do banco de dados
│   │   ├── migrations.lock.toml # Trava as migrações
│   │   └── schema.prisma   # Esquema do Prisma
│   ├── src/                # Código-fonte do backend
│   │   ├── config/          # Arquivos de configuração
│   │   │   └── database.js  # Configuração do banco de dados
│   │   ├── controllers/     # Controladores das rotas
│   │   ├── middleware/      # Middlewares da aplicação
│   │   ├── routes/          # Definição das rotas da API
│   │   └── server.js        # Arquivo principal do servidor
│   ├── jest.config.js      # Configuração do Jest para testes
│   ├── package-lock.json   # Arquivo de lock das dependências do npm
│   └── package.json        # Arquivo de metadados do projeto e dependências
├── extension/               # Diretório da extensão do Chrome
│   ├── README.md           # Documentação da extensão
│   ├── content.js          # Script injetado nas páginas web
│   ├── index.html          # (opcional) Popup da extensão
│   ├── styles.css          # Estilos do popup
│   ├── manifest.json       # Arquivo de manifesto da extensão
│   └── images/             # (opcional) Ícones da extensão
├── frontend/                # Diretório do frontend
│   ├── .gitignore          # .gitignore do frontend
│   └── ...                  # Arquivos e diretórios específicos do framework do frontend
└── README.md              # Este arquivo
```

## Configuração do Backend

### Pré-requisitos

*   Node.js (versão >= 18)
*   npm ou yarn
*   MySQL (ou outro banco de dados compatível com Prisma)

### Etapas de Configuração

1.  **Instale as dependências:**

    ```bash
    cd backend
    npm install
    # ou
    yarn install
    ```

2.  **Configure as variáveis de ambiente:**

    *   Crie um arquivo `.env` na raiz do diretório `backend` com as seguintes variáveis:

        ```
        DATABASE_URL="mysql://seu_usuario:sua_senha@localhost:3306/symplifika_db"
        JWT_SECRET="sua_chave_secreta"
        OPENAI_API_KEY="sua_chave_openai"
        EMAIL_USER="seu_email_gmail"
        EMAIL_PASS="senha_do_seu_email_gmail"

        ```

    *   Substitua os valores placeholder com suas informações reais.

3.  **Execute as migrações do Prisma:**

    ```bash
    npx prisma migrate dev --name init
    #ou
    yarn prisma migrate dev --name init
    ```

4.  **Inicie o servidor:**

    ```bash
    npm run dev
    # ou
    yarn dev
    ```

    O servidor backend será executado em `http://localhost:5000` (ou na porta especificada na variável de ambiente `PORT`).

### Rotas da API Backend

A API Backend fornece as seguintes rotas:

*   **Autenticação (`/api/auth`):**
    *   `POST /register`: Registra um novo usuário.
    *   `POST /login`: Autentica um usuário existente.
    *   `POST /logout`: Realiza o logout do usuário.
    *   `POST /forgot-password`: Inicia o processo de redefinição de senha.
    *   `POST /reset-password/:token`: Redefine a senha do usuário.
    *   `GET /me`: Retorna as informações do usuário autenticado.
*   **OpenAI (`/api/openai`):**
    *   `POST /generate`: Gera texto usando a API OpenAI.
*   **Atalhos (`/api/shortcuts`):**
    *   `GET /`: Retorna todos os atalhos.
    *   `GET /:id`: Retorna um atalho específico por ID.
    *   `POST /`: Cria um novo atalho.
    *   `PUT /:id`: Atualiza um atalho existente.
    *   `DELETE /:id`: Deleta um atalho existente.
*   **Categorias (`/api/categories`):**
    *   `GET /`: Retorna todas as categorias.
    *   `GET /:id`: Retorna uma categoria específica por ID.
    *   `POST /`: Cria uma nova categoria.
    *   `PUT /:id`: Atualiza uma categoria existente.
    *   `DELETE /:id`: Deleta uma categoria existente.
*   **Tags (`/api/tags`):**
    *   `GET /`: Retorna todas as tags.
    *   `GET /:id`: Retorna uma tag específica por ID.
    *   `POST /`: Cria uma nova tag.
    *   `PUT /:id`: Atualiza uma tag existente.
    *   `DELETE /:id`: Deleta uma tag existente.
*   **Sincronização (`/api/sync`):**
    *   `POST /sync`: Sincroniza os dados entre o cliente e o servidor.
    *   `GET /sync/last`: Retorna a data da última sincronização.

### Middlewares

*   `authMiddleware.js`:  Protege as rotas autenticadas através da verificação do token JWT.
*   `errorHandler.js`: Centraliza o tratamento de erros na aplicação.
*   `validationMiddleware.js`:  Valida os dados de entrada nas requisições.

### Modelos Prisma

O esquema Prisma (`schema.prisma`) define os seguintes modelos:

*   **User:** Representa um usuário no sistema.
*   **Category:** Representa uma categoria de atalho.
*   **Tag:** Representa uma tag associada a atalhos.
*   **Shortcut:** Representa um atalho de texto.
*	**UserSync**: representa ultima data de sincronização do usuário.

## Configuração da Extensão do Chrome

### Pré-requisitos

*   Google Chrome

### Etapas de Configuração

1.  **Instale a extensão:**
    *   Abra o Chrome e vá para `chrome://extensions/`.
    *   Ative o "Modo de desenvolvedor" no canto superior direito.
    *   Clique em "Carregar sem compactação".
    *   Selecione o diretório `symplifika/extension/`.

2.  **Conecte a extensão com o backend:**
    *   Verifique no `content.js` que o endereço da API backend é `http://localhost:5000/api`. Altere se necessário.
    *   A extensão espera que o usuário esteja autenticado e tenha um token JWT salvo no `chrome.storage.sync`.  (a ser implementado no frontend)

## Configuração do Frontend
(Adicionar detalhes sobre o framework, dependências e configuração específica do Frontend)

## Fluxo de Autenticação com Firebase

(Descrever como o fluxo de autenticação com Firebase funciona, se aplicável)

## Contribuição

Contribuições são bem-vindas! Siga estas etapas:

1.  Faça um fork do repositório.
2.  Crie uma branch com sua feature: `git checkout -b minha-feature`.
3.  Faça commit das suas mudanças: `git commit -m 'Adiciona nova feature'`.
4.  Faça push para a branch: `git push origin minha-feature`.
5.  Abra um pull request.

## Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).
