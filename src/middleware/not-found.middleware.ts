import { Request, Response, NextFunction } from "express";

const NOT_FOUND = 'Resource not found';

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(404).send(NOT_FOUND);
};