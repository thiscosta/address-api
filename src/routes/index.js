import cep from "./cep.js";
import swagger from "./swagger.js";

export default function mapRoutes({ app, passport, logger }) {
  app.use("/cep", logger, passport.authenticate('basic', {session: false}), cep);
  app.use("/api-docs", swagger);
}
