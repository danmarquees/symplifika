# Symplifika Frontend - Documentação

## Visão Geral

Este repositório contém o código-fonte do frontend do Symplifika, uma aplicação web para gerenciamento de atalhos de texto, organização e automação de tarefas. O frontend é construído com React, TypeScript, Tailwind CSS e Zustand para gerenciamento de estado.

## Estrutura do Projeto

```
symplifika/frontend/src
├── App.tsx             # Componente principal da aplicação
├── components/          # Componentes da interface do usuário
│   ├── features/         # Componentes específicos de cada funcionalidade
│   │   ├── Dashboard/      # Componentes da tela de dashboard
│   │   ├── ImportExport/    # Componentes para importação e exportação de atalhos
│   │   ├── NewShortcut/   # Componentes da tela de adição de novos atalhos
│   │   ├── Profile/        # Componentes da tela de perfil
│   │   ├── Settings/       # Componentes da tela de configurações
│   │   ├── Stats/          # Componentes para exibição de estatísticas
│   │   └── TextExpansion/  # Componentes para o gerenciamento de atalhos
│   ├── layouts/            # Componentes de layout
│   └── ui/                 # Componentes de interface reutilizáveis
├── config/             # Arquivos de configuração
│   └── env.ts           # Variáveis de ambiente
├── hooks/              # Hooks personalizados
│   ├── useApi.tsx       # Hook para chamadas à API
│   └── useAuth.tsx      # Hook para gerenciamento de autenticação
├── lib/                # Utilitários e funções auxiliares
│   ├── axios.ts      # Instância do Axios com configurações
│   └── utils.ts         # Funções utilitárias gerais
├── services/           # Serviços para interação com a API
│   ├── api.ts         # Configuração da API
│   ├── auth.ts        # Serviços de autenticação
│   └── shortcuts.ts   # Serviços para gerenciamento de atalhos
├── store/              # Gerenciamento de estado global com Zustand
│   ├── categoryStore.ts # Store para gerenciar categorias
│   ├── shortcutsStore.ts # Store para gerenciar atalhos
├── styles/             # Estilos CSS globais
│   └── index.css      # Estilos globais e diretivas do Tailwind
├── types/              # Definições de tipo TypeScript
│   ├── global.d.ts    # Definições de tipo globais
│   └── shortcuts.ts   # Definições de tipo para atalhos e categorias
├── utils/              # Utilitários
│   └── textExpansion.ts  # Utilitários para expansão de texto e variáveis
├── index.html            # Página HTML principal
├── index.tsx             # Ponto de entrada do React
├── vite.config.ts      # Configuração do Vite
└── tsconfig.json         # Configuração do TypeScript
```

## Dependências Principais

*   [React](https://reactjs.org/): Biblioteca JavaScript para construir interfaces de usuário.
*   [TypeScript](https://www.typescriptlang.org/): Superset do JavaScript que adiciona tipagem estática.
*   [Tailwind CSS](https://tailwindcss.com/): Framework CSS utilitário para estilização rápida.
*   [Zustand](https://github.com/pmndrs/zustand): Pequena, rápida e escalável solução de gerenciamento de estado.
*   [React Router](https://reactrouter.com/): Biblioteca para roteamento declarativo.
*   [Axios](https://axios-http.com/): Cliente HTTP para fazer requisições à API.
*   [react-markdown](https://github.com/remarkjs/react-markdown): Renderizador de Markdown para React.

## Configuração e Uso

1.  **Clone o repositório:**

```bash
git clone <URL_DO_REPOSITÓRIO>
cd frontend
```

2.  **Instale as dependências:**

```bash
npm install
```

3.  **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto e defina as variáveis necessárias:

```
VITE_API_URL=http://localhost:3000
```

4.  **Execute o servidor de desenvolvimento:**

```bash
npm run dev
```

5.  **Acesse o aplicativo:**

Abra o navegador e acesse `http://localhost:3000`.

## Funcionalidades

*   **Dashboard:** Visão geral com estatísticas e ações rápidas.
*   **Expansão de Texto:** Gerenciamento de atalhos de texto.
    *   Adicionar, editar e remover atalhos.
    *   Suporte a variáveis dinâmicas nos atalhos.
    *   Pré-visualização do texto expandido.
*   **Categorias:** Organização de atalhos por categorias.
    *   Adicionar, editar e remover categorias.
*   **Tags:** Organização de atalhos por tags.
    *   Adicionar, editar e remover tags.
*   **Importar/Exportar:** Importação e exportação de atalhos em formato JSON.
*   **Estatísticas:** Painel com estatísticas de uso dos atalhos.
*   **Configurações:** Configurações da conta e preferências do aplicativo.
*   **Perfil:** Gerenciamento de informações do perfil do usuário.

## Gerenciamento de Estado com Zustand

O frontend utiliza Zustand para gerenciar o estado da aplicação. Os principais stores são:

*   `src/store/shortcutsStore.ts`: Gerencia a lista de atalhos, as operações de adicionar, remover e atualizar, e o histórico de uso.
*   `src/store/categoryStore.ts`: Gerencia a lista de categorias.

## Autenticação

O hook `src/hooks/useAuth.tsx` gerencia o estado de autenticação do usuário, incluindo login, logout e verificação de token.

## Chamadas à API

O diretório `src/services` contém os serviços para interação com a API backend. As requisições são feitas utilizando o Axios, configurado no arquivo `src/lib/axios.ts` para adicionar o token de autenticação nos headers.

## Estilização com Tailwind CSS

A estilização é feita utilizando Tailwind CSS. Os estilos globais e configurações estão no arquivo `src/styles/index.css`, e as classes utilitárias são aplicadas diretamente nos componentes.

## Próximos Passos

*   Implementar autenticação completa com backend.
*   Finalizar a funcionalidade de sincronização com o backend.
*   Implementar testes unitários e de integração.
*   Adicionar internacionalização (i18n).
*   Melhorar o design e a usabilidade da interface.

## Contribuição

Contribuições são bem-vindas! Siga estas etapas:

1.  Faça um fork do repositório.
2.  Crie uma branch com sua feature: `git checkout -b minha-feature`.
3.  Faça commit das suas mudanças: `git commit -m 'Adiciona nova feature'`.
4.  Faça push para a branch: `git push origin minha-feature`.
5.  Abra um pull request.

## Licença

[MIT](LICENSE)
