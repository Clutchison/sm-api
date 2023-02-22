import express, { Response, Router } from 'express';
import 'express-async-errors';
import { BaseRouter } from '../../common/base-router';
import { ALIGNMENT } from './alignment.enum';

export class AlignmentRouter extends BaseRouter {

  public router: Router;
  private static _instance?: AlignmentRouter;

  public static instance(): AlignmentRouter {
    if (!AlignmentRouter._instance) {
      AlignmentRouter._instance = new AlignmentRouter();
    }
    return AlignmentRouter._instance as AlignmentRouter;
  }

  private constructor() {
    super('Alignment');
    this.router = this.initRouter();
  }

  private initRouter = (): Router => {
    const router = express.Router();
    // GET items
    router.get("/", async (_, res: Response) => {
      return res.status(200).send(Object.values(ALIGNMENT));
    });
    return router;
  }
}