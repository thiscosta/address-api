import chai from "chai";
import chaiHttp from "chai-http";
import dotenvSafe from "dotenv-safe";

describe("Test cep controller behavior to different scenarios", function () {
  chai.use(chaiHttp);
  dotenvSafe.config();

  it("Should return the correct address informations of full provided cep (13187229 to 13187229)", async function () {
    chai
      .request(`http://localhost:${process.env.PORT}`)
      .get("/cep?number=13187229")
      .end(function (err, res) {
        delete res.body.service;
        chai.assert.deepEqual(res.body, {
          cep: "13187229",
          state: "SP",
          city: "Hortolândia",
          neighborhood: "Jardim Flamboyant",
          street: "Rua Vilson de Oliveira",
        });
      });
  });

  it("Should return the correct address informations of changed cep (13184354 to 13184350)", async function () {
    chai
      .request(`http://localhost:${process.env.PORT}`)
      .get("/cep?number=13184354")
      .end(function (err, res) {
        delete res.body.service;
        chai.assert.deepEqual(res.body, {
          cep: "13184350",
          state: "SP",
          city: "Hortolândia",
          neighborhood: "Loteamento Remanso Campineiro",
          street: "Rua Luiza Lopes Garcia",
        });
      });
  });

  it("Should return error because the cep is invalid (22333999 to 000000000)", async function () {
    chai
      .request(`http://localhost:${process.env.PORT}`)
      .get("/cep?number=22333999")
      .end(function (err, res) {
        delete res.body.service;
        chai.assert.deepEqual(res.body, {
          notFound: true,
        });
      });
  });
});
