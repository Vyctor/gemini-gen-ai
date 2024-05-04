# Integração API Gemini AI

## Aplicação

É um chat simples que utiliza a API Gemini AI para responder perguntas. A aplicação foi desenvolvida utilizando Nodejs, Typescript e Express.

## Instalação

1. Para instalar a aplicação, basta clonar o repositório e rodar o comando `npm install` para instalar as dependências.

2. Também é necessário criar um arquivo `.env` na raiz do projeto com a chave `GEMINI_API_KEY` e o valor da chave de acesso da API Gemini AI, e também a chave `APP_PORT` com o valor da porta HTTP onde subirá a aplicação.

3. Por fim, basta rodar o comando `npm run start:dev` para iniciar a aplicação. Ou para transpilar para javascript e rodar o comando `npm run compile` e depois `npm start:prod`.
