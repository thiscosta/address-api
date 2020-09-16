import express from "express";

import CepController from "../controllers/cep.js";

import checkIfRequestHasErrors from "../validators/index.js";
import { cepQueryValidations } from "../validators/cep.js";

var router = express.Router();

router
  .route("/")
  .get(cepQueryValidations, checkIfRequestHasErrors, CepController.findAddress);

export default router;
