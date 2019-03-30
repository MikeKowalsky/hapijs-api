const mainController = require("../controllers/main");

module.exports = {
  name: "ApiPlugin",
  register: async (server, options) => {
    server.route([
      {
        method: "GET",
        path: "/api/hello",
        handler: (request, h) => {
          const response = h.response(
            `<html>
              <head>
                <title>hi</title>
              </head>
              <body>
                <h1>Hello, World</h1>
              </body>
            </html>`
          );
          response.type("text/html");
          return response;
        }
      },
      {
        path: "/",
        method: "GET",
        handler: mainController.getIndex
      },
      {
        path: "/todos",
        method: "GET",
        handler: mainController.getTodos
      },
      {
        path: "/todos",
        method: "POST",
        handler: mainController.addTodo
      },
      {
        path: "/{id}",
        method: "GET",
        handler: (request, h) => {
          return `Product ID: ${encodeURIComponent(request.params.id)}`;
        }
      }
    ]);
  }
};
