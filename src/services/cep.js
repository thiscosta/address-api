import { replaceCepDigit } from "../utils/cepUtils.js";

class CepService {
  constructor(cepFinder) {
    this.cep = cepFinder;
    this.findAddress = this.findAddress.bind(this);
  }

  async findAddress(cepNumber, firstExecution = true) {
    let newCep;
    try {
      newCep = firstExecution ? cepNumber : replaceCepDigit(cepNumber);
      if (newCep === "00000000") return { notFound: true };
      const address = await this.cep(newCep);
      return address;
    } catch (error) {
      if (error.type === "service_error") {
        return await this.findAddress(newCep, false);
      }
      return error;
    }
  }
}

export default CepService;
