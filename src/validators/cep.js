import validator from "express-validator";

const { query } = validator

export const cepQueryValidations = [
  query("number")
    .isNumeric({ no_symbols: true })
    .withMessage("CEP Inválido. O CEP deve conter apenar números")
    .isLength({ min: 8, max: 8 })
    .withMessage("CEP inválido. Verifique se o CEP informado possui 8 digitos"),
];
