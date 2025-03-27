Esta pasta contém o código-fonte da extensão do Symplifika para navegadores Chrome. A extensão permite expandir texto, além de autopreencher formulários e mais. Ela facilita o uso de atalhos de texto diretamente nas páginas web.

## Estrutura do Projeto

```
symplifika/extension/
├── README.md       # Este arquivo de documentação
├── content.js      # Script injetado nas páginas web
├── manifest.json   # Arquivo de manifesto da extensão
├── index.html      # (opcional) Popup da extensão
└── images/         # (opcional) Ícones da extensão
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Arquivos Principais

### `manifest.json`

Este é o arquivo de manifesto da extensão, que contém metadados e configurações importantes para o Chrome.

```json
{
  "manifest_version": 3,
  "name": "Symplifika",
  "version": "1.0",
  "description": "Expansor de texto e autopreenchimento com IA.",
  "permissions": ["activeTab", "storage", "scripting"],
  "action": {
    "default_popup": "index.html",
    "default_icon": {
      "16": "/images/icon16.png",
      "48": "/images/icon48.png",
      "128": "/images/icon128.png"
    }
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ],
  "web_accessible_resources": [
    {
      "resources": ["index.html"],
      "matches": ["<all_urls>"]
    }
  ]
}
```

*   `manifest_version`: Versão do formato do arquivo manifest (use 3).
*   `name`: O nome da extensão.
*   `version`: A versão da extensão.
*   `description`: Uma breve descrição da extensão.
*   `permissions`: Lista de permissões que a extensão necessita.
    *   `activeTab`: Permissão para acessar a aba ativa.
    *   `storage`: Permissão para usar o armazenamento local do navegador.
    *   `scripting`: Permissão para injetar scripts.
*   `action`: Configura o popup da extensão (se houver).
    *   `default_popup`: O arquivo HTML a ser exibido no popup.
    *   `default_icon`: Os ícones da extensão.
*   `content_scripts`: Lista de scripts a serem injetados em páginas da web.
    *   `matches`: URLs onde o script será injetado (`<all_urls>` para todas as páginas).
    *   `js`: Os arquivos JavaScript a serem injetados.
*   `web_accessible_resources`: Lista de recursos acessíveis a partir das páginas web.

### `content.js`

Este script é injetado em todas as páginas web que correspondem ao padrão definido em `manifest.json`. Aqui você implementará a lógica principal da extensão.

```javascript
// content.js
console.log("Symplifika: Content script loaded!");

// Exemplo: adicionar um listener para detectar atalhos
document.addEventListener('keydown', (event) => {
    if (event.key === '/') {
        // Implementar lógica para detectar e expandir atalhos
        console.log("Potential shortcut detected!");
    }
});
```

### `index.html`

Opcional: Popup da extensão, que será exibido quando o usuário clicar no ícone da extensão na barra de ferramentas do navegador.

## Instalação da Extensão no Chrome

1.  Abra o Chrome e vá para `chrome://extensions/`.
2.  Ative o "Modo de desenvolvedor" no canto superior direito.
3.  Clique em "Carregar sem compactação".
4.  Selecione o diretório `symplifika/extension/`.

## Teste da Extensão

1.  Abra qualquer página web.
2.  Verifique o console do navegador (clique com o botão direito na página e selecione "Inspecionar") para ver se a mensagem `"Symplifika: Content script loaded!"` é exibida.
3.  Teste a funcionalidade de expansão de texto ou qualquer outra funcionalidade implementada.

## Depuração

*   Utilize as ferramentas de desenvolvedor do Chrome para depurar a extensão.
*   Use `console.log`, `console.warn` e `console.error` para exibir informações no console.
*   Defina breakpoints no painel "Sources" para pausar a execução do código e inspecionar variáveis.
*   Recarregue a extensão para aplicar as alterações.

## Próximos Passos

*   Implementar a lógica de expansão de texto no `content.js`.
*   Adicionar uma interface HTML/CSS no `index.html` para permitir que os usuários configurem a extensão.
*   Utilizar a API `chrome.storage` para armazenar e recuperar configurações da extensão.
*   Implementar a funcionalidade de autopreenchimento de formulários.

## Contribuição

Contribuições são bem-vindas! Siga estas etapas:

1.  Faça um fork do repositório.
2.  Crie uma branch com sua feature: `git checkout -b minha-feature`.
3.  Faça commit das suas mudanças: `git commit -m 'Adiciona nova feature'`.
4.  Faça push para a branch: `git push origin minha-feature`.
5.  Abra um pull request.

## Licença

[MIT](LICENSE)
