# Desafio Técnico - Jitterbit API 🚀

Este projeto consiste em uma API RESTful desenvolvida em Node.js para o gerenciamento de pedidos. O sistema foi construído como parte do teste técnico para a vaga de Professional Services na Jitterbit.

A aplicação recebe dados de pedidos em português, realiza a transformação dos campos para inglês e os armazena em um banco de dados MongoDB, seguindo a arquitetura MVC.

## 📋 Funcionalidades

- **Criação de Pedidos (POST):** Recebe um JSON com chaves em português (`numeroPedido`, `valorTotal`), mapeia para o formato do banco (`orderId`, `value`) e salva.
- **Leitura de Pedidos (GET):** Busca pedidos pelo ID personalizado ou lista todos os registros.
- **Atualização (PUT):** Permite editar dados de um pedido existente.
- **Exclusão (DELETE):** Remove pedidos do banco de dados.
- **Transformação de Dados:** Camada de serviço que garante a conversão correta dos dados antes da persistência.

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução.
- **Express**: Framework web para construção da API.
- **Mongoose**: ODM para modelagem e conexão com MongoDB.
- **Dotenv**: Gerenciamento de variáveis de ambiente.

## 🚀 Como rodar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado.
- [MongoDB](https://www.mongodb.com/) rodando localmente ou uma URI de conexão na nuvem (Atlas).

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU-USUARIO/NOME-DO-REPO.git](https://github.com/SEU-USUARIO/NOME-DO-REPO.git)
   cd NOME-DO-REPO

2. **Instale as dependências:**

    Bash

    npm install

3. **Configure as Variáveis de Ambiente: Crie um arquivo .env na raiz do projeto e defina suas configurações:**

    Snippet de código

    PORT=3000
    MONGO_URI=mongodb://localhost:27017/jitterbit_db
4. **Inicie o servidor:**

    Bash

    npm start
    # Ou para desenvolvimento (se tiver nodemon):
    # npm run dev

A API estará rodando em http://localhost:3000.

📚 Documentação da API
1. Criar Pedido
Recebe os dados no formato "Legacy" (Português) e salva no formato novo.

URL: /order

Método: POST

Body (JSON):

JSON

{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [
        {
            "idItem": "2434",
            "quantidadeItem": 1,
            "valorItem": 1000
        }
    ]
}
2. Buscar Pedido por ID
Busca os dados já transformados no banco de dados.

URL: /order/:id

Método: GET

Exemplo: /order/v10089015vdb-01

Resposta (JSON):

JSON

{
    "_id": "64d...",
    "orderId": "v10089015vdb-01",
    "value": 10000,
    "creationDate": "2023-07-19T12:24:11.529Z",
    "items": [
        {
            "productId": 2434,
            "quantity": 1,
            "price": 1000,
            "_id": "..."
        }
    ]
}
3. Listar Todos os Pedidos
URL: /order/list

Método: GET

4. Atualizar Pedido
URL: /order/:id

Método: PUT

Body: Mesmo formato do POST (será re-mapeado).

5. Deletar Pedido
URL: /order/:id

Método: DELETE

🗂️ Estrutura de Pastas
src/
├── controllers/  # Lógica de controle e transformação de dados
├── models/       # Schema do Mongoose (Estrutura do BD)
├── routes/       # Definição das rotas da API
└── app.js        # Configuração principal do Express
server.js         # Ponto de entrada da aplicação
✒️ Autor
Desenvolvido por Marcos Bandeira (https://www.linkedin.com/in/marcos-bandeira-9a2652212/)