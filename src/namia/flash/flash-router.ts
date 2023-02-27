import express, { Response, Router } from 'express';
import 'express-async-errors';
import { BaseRouter } from '../../common/base-router';
import { rollTrauma } from './trauma';

export class FlashRouter extends BaseRouter {

  public router: Router;
  private static _instance?: FlashRouter;

  public static instance(): FlashRouter {
    if (!FlashRouter._instance) {
      FlashRouter._instance = new FlashRouter();
    }
    return FlashRouter._instance as FlashRouter;
  }

  private constructor() {
    super('Flash');
    this.router = this.initRouter();
  }

  private initRouter = (): Router => {
    const router = express.Router();
    // GET items
    router.get("/", async (_, res: Response) => {
      return res.status(200).send(rollTrauma());
    });
    return router;
  }
}