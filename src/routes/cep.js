import express from "express";

import CepController from "../controllers/cep.js";

import checkIfRequestHasErrors from "../validators/index.js";
import { cepQueryValidations } from "../validators/cep.js";

const cepController = new CepController()

const router = express.Router();

router
  .route("/")
  .get(cepQueryValidations, checkIfRequestHasErrors, cepController.findAddress);

export default router;
