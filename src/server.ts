import { TodoList } from "./core.ts";

const todo = new TodoList();

const port = 3000;

type BodyType = {
  title: string;
};

Bun.serve({
  port,

  async fetch(request) {
    const url = new URL(request.url);

    const pathname = url.pathname;
    const method = request.method;

    // =========================
    // FRONTEND FILES
    // =========================

    // index.html
    if (pathname === "/") {
      const file = Bun.file("./public/index.html");

      return new Response(file, {
        headers: {
          "Content-Type": "text/html"
        }
      });
    }

    // main.js
    if (pathname === "/main.js") {
      const file = Bun.file("./public/main.js");

      return new Response(file, {
        headers: {
          "Content-Type": "application/javascript"
        }
      });
    }

    // main.css
    if (pathname === "/main.css") {
      const file = Bun.file("./public/main.css");

      return new Response(file, {
        headers: {
          "Content-Type": "text/css"
        }
      });
    }

    // =========================
    // API
    // =========================

    // GET /items
    if (pathname === "/items" && method === "GET") {
      const items = todo.getItems();

      return Response.json(items);
    }

    // POST /items
    if (pathname === "/items" && method === "POST") {
      try {
        const body = await request.json() as BodyType;

        if (!body.title) {
          return Response.json(
            { error: "Title is required" },
            { status: 400 }
          );
        }

        const item = todo.addItem(body.title);

        return Response.json(item, {
          status: 201
        });

      } catch {
        return Response.json(
          { error: "Invalid body" },
          { status: 500 }
        );
      }
    }

    // DELETE /items/:id
    if (
      pathname.startsWith("/items/")
      && method === "DELETE"
    ) {
      const id = Number(pathname.split("/")[2]);

      todo.removeItem(id);

      return Response.json({
        success: true
      });
    }

    // PUT /items/:id
    if (
      pathname.startsWith("/items/")
      && method === "PUT"
    ) {
      try {
        const id = Number(pathname.split("/")[2]);

        const body = await request.json() as BodyType;

        const item = todo.updateItem(
          id,
          body.title
        );

        return Response.json(item);

      } catch {
        return Response.json(
          { error: "Failed to update item" },
          { status: 500 }
        );
      }
    }

    return new Response("Not found", {
      status: 404
    });
  }
});

console.log(`Servidor rodando em http://localhost:${port}`);