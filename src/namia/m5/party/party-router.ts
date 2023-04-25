import express, { Request, Response, Router } from 'express';
import 'express-async-errors';
import { Error as MongooseError } from 'mongoose';
import { BaseRouter } from '../../../common/base-router';
import { ValidationError as RunTypesError } from 'runtypes';
import partyService from './party-service';
import { MongoError } from 'mongodb';
import 'express-async-errors';
import { InvalidPartyError } from '../../../blocks/errs/invalid-party-error';
import InvalIdIdError from '../../../common/errs/InvalidIdError';

export class PartyRouter extends BaseRouter {

    public router: Router;
    private static _instance?: PartyRouter;

    public static instance(): PartyRouter {
        if (!PartyRouter._instance) {
            PartyRouter._instance = new PartyRouter();
        }
        return PartyRouter._instance as PartyRouter;
    }

    private constructor() {
        super('Party');
        this.router = this.initRouter();
    }

    private initRouter = (): Router => {
        const router = express.Router();
        // GET party
        router.get("/", async (_, res: Response) => {
            partyService.getAll()
                .then(partys => res.status(200).send(partys))
                .catch((e: unknown) => PartyRouter.send500(res, e instanceof Error ? e.message : undefined));
        });

        // GET party/:id
        router.get("/:id", async (req: Request, res: Response) => {
            const id = req.params.id;
            partyService.getById(id)
                .then((party: any | null) => party ?
                    res.status(200).send(party) :
                    this.send404(res, id))
                .catch((e: unknown) => {
                    if (e instanceof InvalIdIdError) {
                        this.send404(res, id);
                    } else {
                        PartyRouter.send500(res, e instanceof Error ? e.message : undefined)
                    }
                });
        });

        // POST party
        router.post("/", async (req: Request, res: Response) => {
            partyService.create(req.body)
                .then(party => res.status(201).json(party))
                .catch((e: unknown) => {
                    if (e instanceof RunTypesError) {
                        PartyRouter.sendException(res, 400,
                            'Error parsing request body', e.details);
                    } else if (e instanceof MongooseError.ValidationError) {
                        PartyRouter.sendException(res, 400,
                            'Error saving new Party', Object.values(e.errors).map((err) => err.message));
                    } else if (e instanceof InvalidPartyError) {
                        PartyRouter.sendException(res, 400,
                            'Error saving new Party', e.details);
                    } else if ((e as MongoError).code === 11000) {
                        PartyRouter.sendException(res, 400,
                            'A Party with this unique key already exists');
                    } else {
                        PartyRouter.send500(res, e instanceof Error ? e.message : undefined);
                    }
                });
        });

        // PUT party/:name
        router.put("/:name", async (req: Request, res: Response) => {
            const name: string | undefined = req.params.name;
            partyService.update(req.body, name)
                .then(party => party ?
                    res.status(200).send(party) :
                    this.send404(res, name))
                .catch((e: unknown) => {
                    if (e instanceof InvalIdIdError) {
                        this.send404(res, name);
                    } else {
                        PartyRouter.send500(res,
                            e instanceof Error ? e.message : undefined);
                    }
                });
        });

        // DELETE party/:id
        router.delete("/:id", async (req: Request, res: Response) => {
            const id: string | undefined = req.params.id;
            partyService.deleteById(id)
                .then(party => party ?
                    res.status(204).send() :
                    this.send404(res, id))
                .catch((e: unknown) => {
                    if (e instanceof InvalIdIdError) {
                        this.send404(res, id);
                    } else {
                        PartyRouter.send500(res,
                            e instanceof Error ? e.message : undefined)
                    }
                })
        });

        return router;
    }
}
