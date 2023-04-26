import express, { Request, Response, Router } from 'express';
import 'express-async-errors';
import { Error as MongooseError } from 'mongoose';
import { BaseRouter } from '../../../common/base-router';
import { ValidationError as RunTypesError } from 'runtypes';
import itemService, { ItemFilters } from './item-service';
import { MongoError } from 'mongodb';
import 'express-async-errors';
import { InvalidItemError } from '../../../blocks/errs/invalid-item-error';
import InvalIdIdError from '../../../common/errs/InvalidIdError';
import multer from 'multer';
import * as fs from 'fs';

export class ItemRouter extends BaseRouter {

    public router: Router;
    private static _instance?: ItemRouter;

    private static upload = multer({ dest: 'uploads/' });

    public static instance(): ItemRouter {
        if (!ItemRouter._instance) {
            ItemRouter._instance = new ItemRouter();
        }
        return ItemRouter._instance as ItemRouter;
    }

    private constructor() {
        super('Item');
        this.router = this.initRouter();
    }

    private static mapToFilters = (qs: any): ItemFilters => {
        const filters: ItemFilters = {};

        // Name
        if (!!qs.name) filters.name = qs.name;

        // Price
        if (!!qs.price) {
            filters.price = qs.price;
        } else if (!!qs.priceGreaterThan || !!qs.priceLessThan) {
            filters.price = {};
            if (!!qs.priceGreaterThan) filters.price.$gt = qs.priceGreaterThan;
            if (!!qs.priceLessThan) filters.price.$lte = qs.priceLessThan;
        }

        // Grouping
        if (!!qs.grouping) filters.grouping = qs.grouping;

        console.log(filters);
        return filters;
    }

    private initRouter = (): Router => {
        const router = express.Router();
        // GET items
        router.get("/", async (req: Request, res: Response) => {
            itemService.getAll(ItemRouter.mapToFilters(req.query))
                .then(items => res.status(200).send(items))
                .catch((e: unknown) => ItemRouter.send500(res, e instanceof Error ? e.message : undefined));
        });

        // GET items/:name
        router.get("/:name", async (req: Request, res: Response) => {
            const name = req.params.name;
            itemService.getByName(name)
                .then((item: any | null) => item ?
                    res.status(200).send(item) :
                    this.send404(res, name))
                .catch((e: unknown) => {
                    if (e instanceof InvalIdIdError) {
                        this.send404(res, name);
                    } else {
                        ItemRouter.send500(res, e instanceof Error ? e.message : undefined)
                    }
                });
        });

        // POST item
        router.post("/", async (req: Request, res: Response) => {
            itemService.create(req.body)
                .then(item => res.status(201).json(item))
                .catch((e: unknown) => {
                    if (e instanceof RunTypesError) {
                        ItemRouter.sendException(res, 400,
                            'Error parsing request body', e.details);
                    } else if (e instanceof MongooseError.ValidationError) {
                        ItemRouter.sendException(res, 400,
                            'Error saving new Item', Object.values(e.errors).map((err) => err.message));
                    } else if (e instanceof InvalidItemError) {
                        ItemRouter.sendException(res, 400,
                            'Error saving new Item', e.details);
                    } else if ((e as MongoError).code === 11000) {
                        ItemRouter.sendException(res, 400,
                            'A Item with this unique key already exists');
                    } else {
                        ItemRouter.send500(res, e instanceof Error ? e.message : undefined);
                    }
                });
        });

        // POST item/import
        router.post("/import",
            ItemRouter.upload.single('input'),
            async (req: Request, res: Response) => {
                console.log('In import');
                const data = fs.readFileSync(
                    req.file?.path || '',
                    { encoding: 'utf8' });
                itemService.createAll(itemService.parseItems(data));
                const records: any = [];
                res.status(200).send(records);
            });

        // PUT items/:name
        router.put("/:name", async (req: Request, res: Response) => {
            const name: string | undefined = req.params.name;
            itemService.update(req.body, name)
                .then(item => item ?
                    res.status(200).send(item) :
                    this.send404(res, name))
                .catch((e: unknown) => {
                    if (e instanceof InvalIdIdError) {
                        this.send404(res, name);
                    } else {
                        ItemRouter.send500(res,
                            e instanceof Error ? e.message : undefined);
                    }
                });
        });

        // DELETE items/:name
        router.delete("/:name", async (req: Request, res: Response) => {
            const name: string | undefined = req.params.name;
            itemService.deleteByName(name)
                .then(item => item ?
                    res.status(204).send() :
                    this.send404(res, name))
                .catch((e: unknown) => {
                    if (e instanceof InvalIdIdError) {
                        this.send404(res, name);
                    } else {
                        ItemRouter.send500(res,
                            e instanceof Error ? e.message : undefined)
                    }
                })
        });

        return router;
    }
}
