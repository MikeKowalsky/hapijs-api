const path = require("path");

const Hapi = require("hapi");
const Inert = require("inert");

const server = Hapi.server({
  port: 3000,
  host: "localhost",
  routes: {
    files: {
      relativeTo: path.join(__dirname, "public")
    }
  }
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
  await server.register([Inert.plugin, consoleLogging]);
  await server.start();

  console.log("Server running at:", server.info.uri);
};

server.route({
  path: "/",
  method: "GET",
  handler: (request, h) => {
    return h.file("index.html");
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
