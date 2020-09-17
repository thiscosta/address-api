import cep from "cep-promise";
import CepService from "../services/cep.js";
import format from "date-fns/format/index.js";

class CepController {
  constructor(cepFinder = cep) {
    this.cepFinder = cepFinder;
    this.cepService = new CepService(this.cepFinder);
    this.findAddress = this.findAddress.bind(this);
  }

  async findAddress(req, res) {
    try {
      const address = await this.cepService.findAddress(req.query.number);

      req.logger.info({
        request_id: req.id,
        message: `CEP ${req.query.number} ${
          address.notFound ? "NOT" : "WAS"
        } FOUND`,
        tag: "cep_request",
        status: address.notFound ? "failed" : "success",
        datetime: `${format(Date.now(), "dd/MM/yyyy HH:mm:ss.SSS")}`,
      });

      return address.notFound
        ? res.status(404).send()
        : res.status(200).json(address);
    } catch (error) {
      req.logger.error({
        request_id: req.id,
        message: `ERROR: ${JSON.stringify(error)}`,
        tag: "cep_request",
        status: "error",
        datetime: `${format(Date.now(), "dd/MM/yyyy HH:mm:ss.SSS")}`,
      });
      return res.status(400).json(error);
    }
  }
}

export default CepController;
