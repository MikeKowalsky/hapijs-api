const Hapi = require("hapi");

const server = Hapi.server({
  port: 3000,
  host: "localhost"
});

const start = async () => {
  await server.start();
};

start();

server.route({
  path: "/",
  method: "GET",
  handler: (request, h) => {
    return "Hello, hapi!";
  }
});
