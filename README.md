# Todo List Keevo Front

Front de registro de todo, com status de progresso de cada um.

## Tecnologias

Essa sistema foi feito com as seguintes tecnologias:

- Vite (REACT)
- Chakra-UI
- Docker

## Como executar

Essa api foi feita com o conceito de Docker, tanto a api como o banco de dados estão dentro do docker.

A Api está rodando na porta 4000, caso exista algum conflito, modifique no arquivo docker-compose

Para rodar o docker é simples.

##### _(certifique-se que o docker está instalado em sua maquina)_

````bash
  docker compose up -d
````

ou rode localmente:

````bash
  yarn
````

e depois

````bash
  yarn run dev
````