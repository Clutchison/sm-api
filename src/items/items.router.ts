/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface";
import { extractMessage } from "../common/util";

/**
 * Router Definition
 */
export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
itemsRouter.get("/", async (_, res: Response) => {
  try {
    const items: Item[] = await ItemService.findAll();
    res.status(200).send(items);
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

// GET items/:id
itemsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id ?? '', 10);
    const item: Item | null = await ItemService.find(id);
    if (item) return res.status(200).send(item);
    res.status(404).send("item not found");
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

// POST items
itemsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newItem = await ItemService.create(req.body);
    res.status(201).json(newItem);
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

// PUT items/:id
itemsRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id ?? '', 10);
    const itemUpdate: Item = req.body;
    const existingItem: Item | null = await ItemService.find(id);

    if (existingItem) {
      const updatedItem = await ItemService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = await ItemService.create(itemUpdate);
    res.status(201).json(newItem);
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

// DELETE items/:id
itemsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id ?? '', 10);
    await ItemService.remove(id);
    res.sendStatus(204);
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});
