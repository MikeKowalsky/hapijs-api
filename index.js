const Hapi = require("hapi");

const server = Hapi.server({
  port: 3000,
  host: "localhost"
});

const consoleLogging = {
  plugin: require("good"),
  options: {
    ops: {
      interval: 1000
    },
    reporters: {
      consoleReporter: [
        {
          module: "good-squeeze",
          name: "Squeeze",
          args: [{ response: "*", log: "*" }]
        },
        { module: "good-console" },
        "stdout"
      ]
    }
  }
};

const start = async () => {
  await server.register([consoleLogging]);
  await server.start();
};

server.route({
  path: "/",
  method: "GET",
  handler: (request, h) => {
    return "Hello, hapi!";
  }
});

server.route({
  path: "/{id}",
  method: "GET",
  handler: (request, h) => {
    return `Product ID: ${encodeURIComponent(request.params.id)}`;
  }
});

start();
