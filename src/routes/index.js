import cep from "./cep.js";

export default function mapRoutes({ app }) {
  app.use("/cep", cep);
}
