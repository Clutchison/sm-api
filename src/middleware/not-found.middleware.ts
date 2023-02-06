import { Request, Response, NextFunction } from "express";
import HttpException from '../common/http-exception';

const NOT_FOUND = 'Resource not found';

export const notFoundHandler = (
  _: Request,
  response: Response,
  __: NextFunction
) => {
  response.status(404).send(new HttpException(404, NOT_FOUND));
};