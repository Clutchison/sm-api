import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: HttpException,
  _: Request,
  response: Response,
  __: NextFunction
) => {
  const status = error.statusCode || 500;
  response.status(status).send(error);
};