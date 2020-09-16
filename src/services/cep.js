import cep from "cep-promise";

import { replaceCepDigit } from "../utils/cepUtils.js";

class CepService {
  constructor() {
    this.findAddress = this.findAddress.bind(this);
    this.recursiveFindCep = this.recursiveFindCep.bind(this);
  }

  async findAddress(cepNumber) {
    try {
      const address = await cep(cepNumber);
      return address;
    } catch (error) {
      if (error.type === "service_error") {
        const cepResponse = await this.recursiveFindCep(cepNumber);
        return cepResponse.notFound ? [{ msg: `CEP ${cepNumber} não encontrado` }] : cepResponse;
      }
      return error;
    }
  }

  async recursiveFindCep(cepNumber) {
    const newCep = replaceCepDigit(cepNumber);
    if (newCep === "00000000") return { notFound: true };
    try {
      const address = await cep(newCep);
      return address;
    } catch (error) {
      const errorType = error.type;
      if (errorType === "service_error") {
        return this.recursiveFindCep(newCep);
      }
      return error;
    }
  }
}

export default new CepService();
