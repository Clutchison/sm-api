import { Response } from 'express';
import HttpException from './http-exception';
import { MonsterRouter } from '../blocks/monster/monster.router';

export abstract class BaseRouter {

  protected static readonly sendDetails = (): boolean => process.env.ENV === 'dev';

  constructor(resourceName: string) {
    this.send404 = (res: Response, id: string | undefined) =>
      MonsterRouter.sendException(
        res,
        404,
        BaseRouter.construct404Message(resourceName, id)
      );
  }

  protected send404: (res: Response, id: string | undefined) => Response;

  protected static send500 = (res: Response, details?: any) => BaseRouter.sendException(res, 500,
    'Internal server error', BaseRouter.sendDetails() ? details : undefined);

  protected static sendException = (res: Response, code: number, e: unknown, details?: any): Response => {
    const ex = new HttpException(
      code,
      BaseRouter.extractExceptionMessage(e),
      details);
    return res.status(code).send(ex.toJson());
  };

  protected static extractExceptionMessage = (e: unknown): string => {
    if (typeof e === 'string') {
      return e;
    } else if (e instanceof Error) {
      return e.message;
    } else {
      return JSON.stringify(e, null, 4);
    }
  }

  private static construct404Message = (resourceName: string, id: string | undefined) =>
    resourceName + ' not found with id: ' + id;
}