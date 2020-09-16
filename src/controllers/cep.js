import CepService from "../services/cep.js";

class CepController {
  async findAddress(req, res) {
    try {
      const address = await CepService.findAddress(req.query.number);
      return res.json(address);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new CepController();
