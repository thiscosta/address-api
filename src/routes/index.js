import cep from "./cep.js";
import swagger from "./swagger.js";

export default function mapRoutes({ app, passport }) {
  app.use("/cep", passport.authenticate('basic', {session: false}), cep);
  app.use("/api-docs", swagger);
}
