import winston from "winston";
import format from "date-fns/format/index.js";
import { v4 as uuidv4 } from "uuid";

export default function (req, res, next) {
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: "errors.log", level: "error" }),
      new winston.transports.File({
        filename: "information.log",
        level: "info",
      }),
    ],
  });
  req.logger = logger;
  req.id = uuidv4();
  req.logger.info({
    request_id: req.id,
    message: `NEW REQUEST FROM ${req.hostname} FOR ROUTE ${req.originalUrl}`,
    tag: "cep_request",
    status: "new",
    datetime: `${format(Date.now(), "dd/MM/yyyy HH:mm:ss.SSS")}`,
  });
  next();
}
