const mainController = require("../controllers/main");

module.exports = {
  name: "ApiPlugin",
  register: async (server, options) => {
    server.route([
      {
        path: "/",
        method: "GET",
        handler: mainController.getIndex
      },
      {
        path: "/scripts/{file*}",
        method: "GET",
        handler: mainController.getScripts
      },
      {
        path: "/styles/{file*}",
        method: "GET",
        handler: mainController.getStyles
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
