import assert from "assert";

import CepService from "../../src/services/cep.js";
import mockedCepFinder, { fakeValues } from "../mocks/cepFinder.js";

describe("Test cep service behavior to different scenarios (12345678 to 12345678)", function () {
  const cepService = new CepService(mockedCepFinder);

  it("Should return the correct address informations of full provided cep", async function () {
    const foundAddres = await cepService.findAddress("12345678");

    assert.strictEqual(
      foundAddres,
      fakeValues.find((value) => value.cep === "12345678"),
      "The service didnt returned the mocked address value"
    );
  });

  it("Should return the correct address informations of changed cep (13184354 to 13184350)", async function () {
    const foundAddres = await cepService.findAddress("13184354");

    assert.strictEqual(
      foundAddres,
      fakeValues.find((value) => value.cep === "13184350"),
      "The service didnt returned the mocked address value"
    );
  });

  it("Should return error because the cep is invalid (22333999 to 000000000)", async function () {
    const notFoundError = await cepService.findAddress("22333999");
    console.log("notFoundError: ", notFoundError);

    assert.deepStrictEqual(
      notFoundError,
      {notFound: true},
      "The service didnt returned an error because the cep is invalid"
    );
  });
});
