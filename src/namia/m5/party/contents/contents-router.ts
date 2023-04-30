import express, { Request, Response, Router } from 'express';
import { MongoError } from 'mongodb';
import { ValidationError as RunTypesError } from 'runtypes';
import 'express-async-errors';
import contentsService from './contents-service';
import 'express-async-errors';
import { BaseRouter } from '../../../../common/base-router';
import InvalIdIdError from '../../../../common/errs/InvalidIdError';
import { MongooseError } from 'mongoose';
import { InvalidItemError } from '../../../../blocks/errs/invalid-item-error';

export class ContentsRouter extends BaseRouter {

    public router: Router;
    private static _instance?: ContentsRouter;

    public static instance(): ContentsRouter {
        if (!ContentsRouter._instance) {
            ContentsRouter._instance = new ContentsRouter();
        }
        return ContentsRouter._instance as ContentsRouter;
    }

    private constructor() {
        super('Contents');
        this.router = this.initRouter();
    }

    private initRouter = (): Router => {
        const router = express.Router();
        // GET contents
        router.get("/", async (_: Request, res: Response) => {
            contentsService.getAll()
                .then(contents => res.status(200).send(contents))
                .catch((e: unknown) => ContentsRouter.send500(res, e instanceof Error ? e.message : undefined));
        });

        // GET contents/:name
        router.get("/:name", async (req: Request, res: Response) => {
            const name = req.params.name;
            contentsService.getByName(name)
                .then((contents: any | null) => contents ?
                    res.status(200).send(contents) :
                    this.send404(res, name))
                .catch((e: unknown) => {
                    if (e instanceof InvalIdIdError) {
                        this.send404(res, name);
                    } else {
                        ContentsRouter.send500(res, e instanceof Error ? e.message : undefined)
                    }
                });
        });

        // POST contents/
        router.post("/", async (req: Request, res: Response) => {
            contentsService.generate()
                .then(item => res.status(201).json(item))
                .catch((e: unknown) => console.log(e));
        });
        return router;
    }
}
