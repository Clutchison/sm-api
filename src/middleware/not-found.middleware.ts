import { Request, Response, NextFunction } from "express";

const NOT_FOUND = 'Resource not found';

export const notFoundHandler = (
  _: Request,
  response: Response,
  __: NextFunction
) => {
  response.status(404).send(NOT_FOUND);
};