const path = require("path");

const Hapi = require("hapi");
const Inert = require("inert");
const Vision = require("vision");
const Handlebars = require("handlebars");
const mongoose = require("mongoose");

const ApiPlugin = require("./routes/main");

const keys = require("./utils/keys");
const MONGODB_URI = `mongodb+srv://${keys.MONGO_USER}:${
  keys.MONGO_PASSWORD
}@cluster0-idsge.mongodb.net/hapi-playground?retryWrites=true`;

const server = Hapi.server({
  port: 3000,
  host: "localhost"
  // routes: {
  //   files: {
  //     relativeTo: path.join(__dirname, "public")
  //   }
  // }
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
  await server.register([Inert.plugin, consoleLogging, ApiPlugin, Vision]);

  server.views({
    engines: { html: Handlebars },
    relativeTo: __dirname,
    path: "views"
  });

  await server.start();

  console.log(`Server is running at ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(connected => {
    console.log("***** MongoDB connected *****");
    bootUpServer();
  })
  .catch(err => console.log(err));
