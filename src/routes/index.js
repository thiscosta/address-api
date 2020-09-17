import cep from "./cep.js";

export default function mapRoutes({ app, passport }) {
  app.use("/cep", passport.authenticate('basic', {session: false}), cep);
}
