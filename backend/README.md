**Documentação da API Backend Symplifika**

**Base URL:**
A base URL da API é `http://localhost:5000/api` (ou o valor da variável de ambiente `VITE_API_URL` no seu arquivo `.env`).

**Autenticação:**
A maioria das rotas requer autenticação JWT. Para autenticar, inclua o token JWT no header `Authorization` com o esquema `Bearer`:

`Authorization: Bearer <token>`

**Rotas de Autenticação (`/api/auth`)**

*   **`POST /register`:** Registra um novo usuário.
    *   **Parâmetros do corpo da requisição:**
        *   `name` (string, obrigatório): Nome do usuário.
        *   `email` (string, obrigatório): Email do usuário.
        *   `password` (string, obrigatório): Senha do usuário.
    *   **Resposta de sucesso (200 OK):**
        ```json
        {
          "token": "<jwt_token>",
          "user": {
            "id": "<user_id>",
            "name": "<user_name>",
            "email": "<user_email>"
          }
        }
        ```
    *   **Resposta de erro (400 Bad Request):**
        ```json
        {
          "msg": "Usuário já existe"
        }
        ```
    *   **Resposta de erro (500 Internal Server Error):**
        ```json
        {
          "msg": "Erro no servidor"
        }
        ```
*   **`POST /login`:** Autentica um usuário existente.
    *   **Parâmetros do corpo da requisição:**
        *   `email` (string, obrigatório): Email do usuário.
        *   `password` (string, obrigatório): Senha do usuário.
    *   **Resposta de sucesso (200 OK):**
        ```json
        {
          "token": "<jwt_token>",
          "user": {
            "id": "<user_id>",
            "name": "<user_name>",
            "email": "<user_email>"
          }
        }
        ```
    *   **Resposta de erro (400 Bad Request):**
        ```json
        {
          "msg": "Usuário não encontrado"
        }
        ```
    *   **Resposta de erro (400 Bad Request):**
        ```json
        {
          "msg": "Senha inválida"
        }
        ```
    *   **Resposta de erro (500 Internal Server Error):**
        ```json
        {
          "msg": "Erro no servidor"
        }
        ```
*   **`GET /me`:** Retorna as informações do usuário autenticado.
    *   **Headers:**
        *   `Authorization`: `Bearer <jwt_token>`
    *   **Resposta de sucesso (200 OK):**
        ```json
        {
          "id": "<user_id>",
          "name": "<user_name>",
          "email": "<user_email>"
        }
        ```
    *   **Resposta de erro (401 Unauthorized):**
        ```json
        {
          "message": "Token ausente"
        }
        ```
    *   **Resposta de erro (403 Forbidden):**
        ```json
        {
          "message": "Token inválido"
        }
        ```
    *   **Resposta de erro (500 Internal Server Error):**
        ```json
        {
          "msg": "Erro no servidor"
        }
        ```
*   **`POST /logout`:** Realiza o logout do usuário (apenas invalida o token no cliente).
    *    **Headers:**
        *   `Authorization`: `Bearer <jwt_token>`
    *   **Resposta de sucesso (200 OK):**
        ```json
        {
          "msg": "Logout realizado com sucesso"
        }
        ```
    *   **Resposta de erro (500 Internal Server Error):**
        ```json
        {
          "msg": "Erro no servidor"
        }
        ```
*   **`POST /forgot-password`:** Inicia o processo de redefinição de senha.
    *   **Parâmetros do corpo da requisição:**
        *   `email` (string, obrigatório): Email do usuário.
    *   **Resposta de sucesso (200 OK):**
        ```json
        {
          "msg": "Email de redefinição de senha enviado"
        }
        ```
    *   **Resposta de erro (404 Not Found):**
        ```json
        {
          "msg": "Usuário não encontrado"
        }
        ```
    *   **Resposta de erro (500 Internal Server Error):**
        ```json
        {
          "msg": "Erro ao solicitar redefinição de senha"
        }
        ```
*   **`POST /reset-password/:token`:** Redefine a senha do usuário.
    *   **Parâmetros da rota:**
        *   `token` (string, obrigatório): Token de redefinição de senha.
    *   **Parâmetros do corpo da requisição:**
        *   `password` (string, obrigatório): Nova senha.
    *   **Resposta de sucesso (200 OK):**
        ```json
        {
          "msg": "Senha redefinida com sucesso"
        }
        ```
    *   **Resposta de erro (400 Bad Request):**
        ```json
        {
          "msg": "Token inválido ou expirado"
        }
        ```
    *   **Resposta de erro (500 Internal Server Error):**
        ```json
        {
          "msg": "Erro ao redefinir a senha"
        }
        ```

**Rotas OpenAI (`/api/openai`)**

*   **`POST /generate`:** Gera texto usando a API OpenAI.
    *   **Parâmetros do corpo da requisição:**
        *   `prompt` (string, obrigatório): Prompt para gerar o texto.
    *   **Resposta de sucesso (200 OK):**
        ```json
        {
          "text": "<generated_text>"
        }
        ```
    *   **Resposta de erro (400 Bad Request):**
        ```json
        {
          "msg": "Prompt is required"
        }
        ```
    *   **Resposta de erro (500 Internal Server Error):**
        ```json
        {
          "msg": "Erro ao gerar texto",
          "error": "<error_message>"
        }
        ```

**Rotas de Atalhos (`/api/shortcuts`)**

*   **`GET /`:** Retorna todos os atalhos.
    *   **Headers:**
        *   `Authorization`: `Bearer <jwt_token>`
    *   **Resposta de sucesso (200 OK):**
        ```json
        [
          {
            "id": "<shortcut_id>",
            "trigger": "<shortcut_trigger>",
            "content": "<shortcut_content>",
            "variables": [ ... ],
            "categoryId": "<category_id>",
            "tags": [ ... ]
          }
        ]
        ```
    *   **Resposta de erro (500 Internal Server Error):**
        ```json
        {
          "msg": "Erro ao buscar atalhos"
        }
        ```
*   **`GET /:id`:** Retorna um atalho específico por ID.
    *   **Parâmetros da rota:**
        *   `id` (string, obrigatório): ID do atalho.
    *    **Headers:**
        *   `Authorization`: `Bearer <jwt_token>`
    *   **Resposta de sucesso (200 OK):**
        ```json
        {
          "id": "<shortcut_id>",
          "trigger": "<shortcut_trigger>",
          "content": "<shortcut_content>",
          "variables": [ ... ],
          "categoryId": "<category_id>",
          "tags": [ ... ]
        }
        ```
    *   **Resposta de erro (404 Not Found):**
        ```json
        {
          "msg": "Atalho não encontrado"
        }
        ```
    *   **Resposta de erro (500 Internal Server Error):**
        ```json
        {
          "msg": "Erro ao buscar atalho"
        }
        ```
*   **`POST /`:** Cria um novo atalho.
    *   **Headers:**
        *   `Authorization`: `Bearer <jwt_token>`
    *   **Parâmetros do corpo da requisição:**
        *   `trigger` (string, obrigatório): Atalho do texto.
        *   `content` (string, obrigatório): Conteúdo expandido.
        *   `variables` (array, opcional): Array de variáveis.
        *   `categoryId` (string, opcional): ID da categoria.
        *   `tags` (array, opcional): Array de tags.
    *   **Resposta de sucesso (201 Created):**
        ```json
        {
          "id": "<shortcut_id>",
          "trigger": "<shortcut_trigger>",
          "content": "<shortcut_content>",
          "variables": [ ... ],
          "categoryId": "<category_id>",
          "tags": [ ... ]
        }
        ```
    *   **Resposta de erro (500 Internal Server Error):**
        ```json
        {
          "msg": "Erro ao criar atalho"
        }
        ```
*   **`PUT /:id`:** Atualiza um atalho existente.
    *   **Parâmetros da rota:**
        *   `id` (string, obrigatório): ID do atalho.
    *   **Headers:**
        *   `Authorization`: `Bearer <jwt_token>`
    *   **Parâmetros do corpo da requisição:** (mesmo formato do POST)
    *   **Resposta de sucesso (200 OK):**
        ```json
        {
          "id": "<shortcut_id>",
          "trigger": "<shortcut_trigger>",
          "content": "<shortcut_content>",
          "variables": [ ... ],
          "categoryId": "<category_id>",
          "tags": [ ... ]
        }
        ```
    *   **Resposta de erro (500 Internal Server Error):**
        ```json
        {
          "msg": "Erro ao atualizar atalho"
        }
        ```
*   **`DELETE /:id`:** Deleta um atalho existente.
    *   **Parâmetros da rota:**
        *   `id` (string, obrigatório): ID do atalho.
    *    **Headers:**
        *   `Authorization`: `Bearer <jwt_token>`
    *   **Resposta de sucesso (200 OK):**
        ```json
        {
          "msg": "Atalho deletado"
        }
        ```
    *   **Resposta de erro (500 Internal Server Error):**
        ```json
        {
          "msg": "Erro ao deletar atalho"
        }
        ```

**Rotas de Categoria (`/api/categories`) e Tags (`/api/tags`):**

As rotas para categorias e tags seguem o mesmo padrão CRUD das rotas de atalhos, com os parâmetros e respostas apropriados para cada entidade.

* Implemente as rotas de acordo com o blueprint de *Shortcuts* (GET, GET:id, POST, PUT:id e DELETE:id).

**Rota de Sincronização (`/api/sync`)**

*   **`POST /sync`:** Sincroniza os dados entre o cliente e o servidor.
    *   **Headers:**
        *   `Authorization`: `Bearer <jwt_token>`
    *   **Parâmetros do corpo da requisição:**
        ```json
        {
          "shortcuts": [ ... ],
          "categories": [ ... ],
          "lastSyncedAt": "<date_string>"
        }
        ```
    *   **Resposta de sucesso (200 OK):**
        ```json
        {
          "message": "Sincronização concluída com sucesso"
        }
        ```
    *   **Resposta de erro (500 Internal Server Error):**
        ```json
        {
          "message": "Erro ao sincronizar os dados"
        }
        ```
*   **`GET /sync/last`:** Retorna a data da última sincronização.
    *   **Headers:**
        *   `Authorization`: `Bearer <jwt_token>`
    *   **Resposta de sucesso (200 OK):**
        ```json
        {
          "lastSyncedAt": "<date_string>"
        }
        ```
    *   **Resposta de erro (500 Internal Server Error):**
        ```json
        {
          "message": "Erro ao obter a data"
        }
        ```

**Observações:**

*   Substitua `<jwt_token>`, `<user_id>`, `<user_name>`, `<user_email>`, `<shortcut_id>`, `<shortcut_trigger>`, `<shortcut_content>`, e `<category_id>` pelos valores reais.
*   Todos os exemplos de código pressupõem que você está usando JSON para o corpo das requisições e respostas.
*   Lembre-se de que a URL do seu servidor pode ser diferente de `http://localhost:5000/api`. Ajuste conforme necessário.
