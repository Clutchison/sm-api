import express, { Request, Response } from 'express';
import { Monster } from './monster.model';
import { extractMessage, send404ForResource } from '../../common/util';
import mongoose from 'mongoose';

export const monsterRouter = express.Router();
const idIsValid = mongoose.Types.ObjectId.isValid;
const send404 = send404ForResource('Monster');

// GET items
monsterRouter.get("/", async (_, res: Response) => {
  try {
    const monsters = await Monster.find();
    res.status(200).send(monsters);
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

// GET items/:id
monsterRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: string | undefined = req.params.id;
    if (!id || !idIsValid(id)) return send404(id, res);
    const monster = await Monster.findById(id);
    if (monster) return res.status(200).send(monster);
    res.status(404).send('Monster not found with id: ' + id);
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

// POST Monster
monsterRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { name, description, cr } = req.body;
    const monster = Monster.build({ name, description, cr });
    await monster.save();
    res.status(201).json(monster);
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

// PUT items/:id
monsterRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: string | undefined = req.params.id;
    if (!id || !idIsValid(id)) return send404(id, res);
    const { name, description, cr } = req.body;
    let existingMonster = await Monster.findById(id);
    if (existingMonster) {
      existingMonster.name = name ?? existingMonster.name;
      existingMonster.description = description ?? existingMonster.description;
      existingMonster.cr = cr ?? existingMonster.cr;
      await existingMonster.save().then(savedMonster => res.status(200).json(savedMonster));
    } else {
      return send404(id, res);
    }
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

// DELETE items/:id
monsterRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: string | undefined = req.params.id;
    if (!id || !idIsValid(id)) return send404(id, res);
    const monster = await Monster.findById(id);
    if (monster) {
      monster.delete()
        .then(res.sendStatus(204));
    } else {
      return send404(id, res);
    }
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});