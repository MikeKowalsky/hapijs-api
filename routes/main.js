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
