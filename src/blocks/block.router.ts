import express, { Request, Response } from 'express';
import { Block } from './block.model';
import { extractMessage } from "../common/util";
import mongoose from 'mongoose';

export const blockRouter = express.Router();
const idIsValid = mongoose.Types.ObjectId.isValid;

// GET items
blockRouter.get("/", async (_, res: Response) => {
  try {
    const blocks = await Block.find();
    res.status(200).send(blocks);
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

// GET items/:id
blockRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: string | undefined = req.params.id;
    if (!id || !idIsValid(id)) return send404(id, res);
    const block = await Block.findById(id);
    if (block) return res.status(200).send(block);
    res.status(404).send('Block not found with id: ' + id);
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

// POST Block
blockRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { name, description, cr } = req.body;
    const block = Block.build({ name, description, cr });
    await block.save();
    res.status(201).json(block);
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

// PUT items/:id
blockRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: string | undefined = req.params.id;
    if (!id || !idIsValid(id)) return send404(id, res);
    const { name, description, cr } = req.body;
    let existingBlock = await Block.findById(id);
    if (existingBlock) {
      existingBlock.name = name ?? existingBlock.name;
      existingBlock.description = description ?? existingBlock.description;
      existingBlock.cr = cr ?? existingBlock.cr;
      await existingBlock.save().then(savedBlock => res.status(200).json(savedBlock));
    } else {
      return send404(id, res);
    }
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

// DELETE items/:id
blockRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: string | undefined = req.params.id;
    if (!id || !idIsValid(id)) return send404(id, res);
    const block = await Block.findById(id);
    if (block) {
      block.delete()
        .then(res.sendStatus(204));
    } else {
      return send404(id, res);
    }
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

const send404 = (id: string | undefined, res: Response) =>
  res.status(404).send('Block not found with id: ' + id);