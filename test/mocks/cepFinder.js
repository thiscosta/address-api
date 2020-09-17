import sinon from "sinon";
import cep from "cep-promise";

export const fakeValues = [
  {
    cep: "12345678",
    state: "Estado teste",
    city: "Cidade teste",
    neighborhood: "Bairro teste",
    street: "Rua teste",
    service: "serviço teste",
  },
  {
    cep: "13184350",
    state: "Estado teste 2",
    city: "Cidade teste 2",
    neighborhood: "Bairro teste 2",
    street: "Rua teste 2",
    service: "serviço teste 2",
  },
  {
    cep: "30000000",
    state: "Estado teste 3",
    city: "Cidade teste 3",
    neighborhood: "Bairro teste 3",
    street: "Rua teste 3",
    service: "serviço teste 3",
  },
];

const fakeErrorReturn = {
  name: "CepPromiseError",
  message: "Todos os serviços de CEP retornaram erro.",
  type: "service_error",
  errors: [
    {
      name: "ServiceError",
      message: "CEP não encontrado na base do BrasilAPI.",
      service: "brasilapi",
    },
    {
      name: "ServiceError",
      message: "Erro ao se conectar com o serviço ViaCEP.",
      service: "viacep",
    },
    {
      name: "ServiceError",
      message: "CEP não encontrado na base do WideNet.",
      service: "widenet",
    },
    {
      name: "ServiceError",
      message: "Não foi possível interpretar o XML de resposta.",
      service: "correios",
    },
  ],
};

const cepFinder = sinon.stub();
fakeValues.forEach((value) => cepFinder.withArgs(value.cep).returns(value));
cepFinder.withArgs("13184354").throws(fakeErrorReturn);
cepFinder.withArgs("22333999").returns(cep("22333999"));
cepFinder.withArgs("22333990").returns(cep("22333990"));
cepFinder.withArgs("22333900").returns(cep("22333900"));
cepFinder.withArgs("22333000").returns(cep("22333000"));
cepFinder.withArgs("22330000").returns(cep("22330000"));
cepFinder.withArgs("22300000").returns(cep("22300000"));
cepFinder.withArgs("22000000").returns(cep("22000000"));
cepFinder.withArgs("20000000").returns(cep("20000000"));

export default cepFinder;
