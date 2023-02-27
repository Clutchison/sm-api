import express, {Request, Response, Router } from 'express';
import 'express-async-errors';
import { BaseRouter } from '../../common/base-router';
import { Rolls, rollTrauma } from './trauma';

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
    // POST Flash Storm Roll
    router.post("/", async (req: Request, res: Response) => {
      const rolls: Rolls = req.body;
      return res.status(200).send(rollTrauma(rolls));
    });
    return router;
  }
}