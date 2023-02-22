import express, { Response, Router } from 'express';
import 'express-async-errors';
import { BaseRouter } from '../../common/base-router';
import { SIZE } from './size';

export class SizeRouter extends BaseRouter {

  public router: Router;
  private static _instance?: SizeRouter;

  public static instance(): SizeRouter {
    if (!SizeRouter._instance) {
      SizeRouter._instance = new SizeRouter();
    }
    return SizeRouter._instance as SizeRouter;
  }

  private constructor() {
    super('Size');
    this.router = this.initRouter();
  }

  private initRouter = (): Router => {
    const router = express.Router();
    // GET items
    router.get("/", async (_, res: Response) => {
      return res.status(200).send(Object.values(SIZE));
    });
    return router;
  }
}