import express, { Request, Response, Router } from 'express';
import { Error as MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';
import monsterService from './monster.service';
import { ValidationError as RunTypesError } from 'runtypes';
import 'express-async-errors';
import { BaseRouter } from '../../common/base-router';
import InvalIdIdError from '../../common/errs/InvalidIdError';
import { InvalidMonsterError } from '../errs/invalid-monster-error';

export class MonsterRouter extends BaseRouter {

  public router: Router;
  private static _instance?: MonsterRouter;

  public static instance(): MonsterRouter {
    if (!MonsterRouter._instance) {
      MonsterRouter._instance = new MonsterRouter();
      return MonsterRouter._instance;
    }
    return MonsterRouter._instance as MonsterRouter;
  }

  private constructor() {
    super('Monster');
    this.router = this.initRouter();
  }

  private initRouter = (): Router => {
    const router = express.Router();
    // GET items
    router.get("/", async (_, res: Response) => {
      monsterService.getAll()
        .then(monsters => res.status(200).send(monsters))
        .catch((e: unknown) => MonsterRouter.send500(res, e instanceof Error ? e.message : undefined));
    });

    // GET items/:id
    router.get("/:id", async (req: Request, res: Response) => {
      const id = req.params.id;
      monsterService.getById(id)
        .then((monster: any | null) => monster ?
          res.status(200).send(monster) :
          this.send404(res, id))
        .catch((e: unknown) => {
          if (e instanceof InvalIdIdError) {
            this.send404(res, id);
          } else {
            MonsterRouter.send500(res, e instanceof Error ? e.message : undefined)
          }
        });
    });

    // POST Monster
    router.post("/", async (req: Request, res: Response) => {
      monsterService.create(req.body)
        .then(monster => res.status(201).json(monster))
        .catch((e: unknown) => {
          if (e instanceof RunTypesError) {
            MonsterRouter.sendException(res, 400,
              'Error parsing request body', e.details);
          } else if (e instanceof MongooseError.ValidationError) {
            MonsterRouter.sendException(res, 400,
              'Error saving new Monster', Object.values(e.errors).map((err) => err.message));
          } else if (e instanceof InvalidMonsterError) {
            MonsterRouter.sendException(res, 400,
              'Error saving new Monster', e.details);
          } else if ((e as MongoError).code === 11000) {
            MonsterRouter.sendException(res, 400,
              'A Monster with this unique key already exists');
          } else {
            MonsterRouter.send500(res, e instanceof Error ? e.message : undefined);
          }
        });
    });

    // PUT items/:id
    router.put("/:id", async (req: Request, res: Response) => {
      const id: string | undefined = req.params.id;
      monsterService.update(req.body, id)
        .then(monster => monster ?
          res.status(200).send(monster) :
          this.send404(res, id))
        .catch((e: unknown) => {
          if (e instanceof InvalIdIdError) {
            this.send404(res, id);
          } else {
            MonsterRouter.send500(res, e instanceof Error ? e.message : undefined);
          }
        });
    });

    // DELETE items/:id
    router.delete("/:id", async (req: Request, res: Response) => {
      const id: string | undefined = req.params.id;
      monsterService.deleteById(id)
        .then(monster => monster ?
          res.status(204).send() :
          this.send404(res, id))
        .catch((e: unknown) => {
          if (e instanceof InvalIdIdError) {
            this.send404(res, id);
          } else {
            MonsterRouter.send500(res, e instanceof Error ? e.message : undefined)
          }
        })
    });

    return router;
  }
}
