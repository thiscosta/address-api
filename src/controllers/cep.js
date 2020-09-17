import cep from "cep-promise";
import CepService from "../services/cep.js";

class CepController {
  constructor(cepFinder = cep) {
    this.cepFinder = cepFinder;
    this.cepService = new CepService(this.cepFinder);
    this.findAddress = this.findAddress.bind(this);
  }

  async findAddress(req, res) {
    try {
      const address = await this.cepService.findAddress(req.query.number);
      return res.json(address);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default CepController;
