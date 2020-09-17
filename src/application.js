import express from "express";
import dotenvSafe from "dotenv-safe";
import bodyParser from "body-parser";
import passport from "./middlewares/authentication/passport.js";
import promBundle from "express-prom-bundle";
import logger from './middlewares/logger/index.js'

import mapRoutes from "./routes/index.js";

class Application {
  constructor() {
    this.binds = this.binds.bind(this)();

    this.configure();
    this.middlewares();
    this.routes();
  }

  binds() {
    this.configure = this.configure.bind(this);
    this.middlewares = this.middlewares.bind(this);
    this.routes = this.routes.bind(this);
  }

  configure() {
    dotenvSafe.config();
    this.app = express();
  }

  middlewares() {
    this.app.use(bodyParser.json());
    this.app.use(promBundle({ includeMethod: true }));
  }

  routes() {
    mapRoutes({ app: this.app, passport, logger });
  }

  start() {
    this.app.listen(process.env.PORT);
    console.log(`Listening on port ${process.env.PORT}`);
  }
}

export default new Application();
