import validators from "express-validator";

const { validationResult } = validators;

export default function checkIfRequestHasErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
