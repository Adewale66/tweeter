import { info } from "../utils/logger";
import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  info(error);
  let statusCode = 500;
  let errorMessage = "An unknown error occurred";
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
};

export default errorHandler;
