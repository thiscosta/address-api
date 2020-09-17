import chai from 'chai'

import { replaceCepDigit } from "../../src/utils/cepUtils.js";

it("Should return the correct changed cep", function () {
  const cep = "22333999";
  const expectedCep = "22333990";
  chai.assert.strictEqual(
    replaceCepDigit(cep),
    expectedCep,
    "The utility method for change last valid digit from CEP did not worked as expected"
  );
});
