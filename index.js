const path = require("path");

const Hapi = require("hapi");
const Inert = require("inert");

const ApiPlugin = require("./routes/main");

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

const bootUpServer = async () => {
  await server.register([Inert.plugin, consoleLogging, ApiPlugin]);
  await server.start();

  console.log(`Server is running at ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

// server.route({
//   path: "/",
//   method: "GET",
//   handler: (request, h) => {
//     return h.file("index.html");
//   }
// });

// server.route({
//   path: "/{id}",
//   method: "GET",
//   handler: (request, h) => {
//     return `Product ID: ${encodeURIComponent(request.params.id)}`;
//   }
//   // handler: {
//   //   directory: {
//   //     path: Path.join(__dirname, "public"),
//   //     listing: true
//   //   }
//   // }
// });

bootUpServer();
