# README

## Sobre o projeto

Este projeto é uma aplicação de lista de tarefas utilizando:

* Bun
* SQLite
* TypeScript
* HTML
* CSS
* JavaScript

O projeto anteriormente utilizava localStorage para salvar as tarefas, mas foi alterado para utilizar banco de dados SQLite.

---

# Como o código funciona

## core.ts

O arquivo `core.ts` é responsável pela conexão com o banco de dados SQLite e pelas funções que manipulam as tarefas.

O banco é criado automaticamente:

```sql
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL
)
```

As funções implementadas foram:

### getItems()

Busca todas as tarefas salvas no banco.

```ts
getItems()
```

---

### addItem()

Adiciona uma nova tarefa no banco.

```ts
addItem(title: string)
```

Executa:

```sql
INSERT INTO items (title) VALUES (?)
```

---

### removeItem()

Remove uma tarefa pelo ID.

```ts
removeItem(id: number)
```

Executa:

```sql
DELETE FROM items WHERE id = ?
```

---

### updateItem()

Atualiza o título de uma tarefa.

```ts
updateItem(id: number, title: string)
```

Executa:

```sql
UPDATE items SET title = ? WHERE id = ?
```

---

# server.ts

O arquivo `server.ts` cria o servidor utilizando Bun.

Ele possui duas responsabilidades:

* servir os arquivos do frontend
* criar as rotas da API

Os arquivos servidos são:

* index.html
* main.js
* main.css

---

# Rotas da API

## GET /items

Retorna todas as tarefas.

---

## POST /items

Cria uma nova tarefa.

Body:

```json
{
  "title": "Nova tarefa"
}
```

---

## PUT /items/:id

Atualiza uma tarefa.

Body:

```json
{
  "title": "Novo título"
}
```

---

## DELETE /items/:id

Remove uma tarefa pelo ID.

---

# main.js

O arquivo `main.js` controla o frontend.

As funções implementadas foram:

### loadTasks()

Busca as tarefas da API utilizando:

```js
fetch('/items')
```

---

### createTask()

Cria uma nova tarefa utilizando:

```js
fetch('/items', {
  method: 'POST'
})
```

---

### createTaskElement()

Cria os elementos HTML da tarefa e adiciona o botão de deletar.

---

# Como rodar o projeto

## 1. Instalar dependências

```bash
bun install
```

---

## 2. Rodar o servidor

```bash
bun run src/server.ts
```

---

## 3. Abrir no navegador

```txt
http://localhost:3000
```

---

# Como testar as rotas

As rotas podem ser testadas utilizando:

* navegador
* Postman
* Insomnia
* Thunder Client

---

## Testar GET

Abrir:

```txt
http://localhost:3000/items
```

---

## Testar POST

```http
POST /items
```

Body:

```json
{
  "title": "Estudar Bun"
}
```

---

## Testar PUT

```http
PUT /items/1
```

Body:

```json
{
  "title": "Novo nome"
}
```

---

## Testar DELETE

```http
DELETE /items/1
```
