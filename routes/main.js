module.exports = {
  name: "ApiPlugin",
  register: async (server, options) => {
    server.route([
      {
        method: "GET",
        path: "/api/hello",
        handler: async (request, h) => {
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
        handler: (request, h) => {
          return h.file("index.html");
        }
      },
      {
        path: "/{id}",
        method: "GET",
        handler: (request, h) => {
          return `Product ID: ${encodeURIComponent(request.params.id)}`;
        }
        // handler: {
        //   directory: {
        //     path: Path.join(__dirname, "public"),
        //     listing: true
        //   }
        // }
      }
    ]);

    // server.route();

    // server.route();
  }
};
