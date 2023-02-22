import express, { Response, Router } from 'express';
import 'express-async-errors';
import { BaseRouter } from '../../../common/base-router';
import { CHALLENGE_RATING } from './challenge-rating';

export class ChallengeRatingRouter extends BaseRouter {

  public router: Router;
  private static _instance?: ChallengeRatingRouter;

  public static instance(): ChallengeRatingRouter {
    if (!ChallengeRatingRouter._instance) {
      ChallengeRatingRouter._instance = new ChallengeRatingRouter();
    }
    return ChallengeRatingRouter._instance as ChallengeRatingRouter;
  }

  private constructor() {
    super('Challenge Rating');
    this.router = this.initRouter();
  }

  private initRouter = (): Router => {
    const router = express.Router();
    // GET items
    router.get("/", async (_, res: Response) => {
      return res.status(200).send(Object.values(CHALLENGE_RATING));
    });
    return router;
  }
}