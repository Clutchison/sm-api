import express, { Request, Response } from 'express';
import { MonsterInterface } from './monster.model';
import mongoose from 'mongoose';
import * as core from 'express-serve-static-core';
import { send404ForResource } from '../../common/util/send-404';
import { extractMessage } from '../../common/util/extract-message';
import { MonsterService } from './monster.service';

export const monsterRouter = express.Router();
const send404 = send404ForResource('Monster');

// GET items
monsterRouter.get("/", async (_, res: Response) => {
  try {
    const monsters = await MonsterService.getAll();
    res.status(200).send(monsters);
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

// GET items/:id
monsterRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: string | undefined = req.params.id;
    if (id === undefined) return send404(id, res);
    const monster = await MonsterService.getById(id);
    if (monster) return res.status(200).send(monster);
    else return send404(id, res);
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

// POST Monster
monsterRouter.post("/", async (req: Request<never, never, MonsterInterface>, res: Response) => {
  // try {
  const l: MonsterInterface = req.body;
  console.log(l.name);
  return res.status(200).json(l);
  //   const newMonster: MonsterInterface = req.body;
  //   const monster = await MonsterService.create(newMonster);
  //   res.status(201).json(monster);
  // } catch (e: unknown) {
  //   res.status(500).send(extractMessage(e));
  // }
});

// // PUT items/:id
// monsterRouter.put("/:id", async (req: Request, res: Response) => {
//   try {
//     const id: string | undefined = req.params.id;
//     if (id === undefined) return send404(id, res);
//     const updatedMonser = req.body;
//     let existingMonster = await Monster.findById(id);
//     if (existingMonster) {
//       existingMonster.name = name ?? existingMonster.name;
//       existingMonster.description = description ?? existingMonster.description;
//       existingMonster.cr = cr ?? existingMonster.cr;
//       await existingMonster.save().then(savedMonster => res.status(200).json(savedMonster));
//     } else {
//       return send404(id, res);
//     }
//   } catch (e: unknown) {
//     res.status(500).send(extractMessage(e));
//   }
// });

// // DELETE items/:id
// monsterRouter.delete("/:id", async (req: Request, res: Response) => {
//   try {
//     const id: string | undefined = req.params.id;
//     if (!id || !idIsValid(id)) return send404(id, res);
//     const monster = await Monster.findById(id);
//     if (monster) {
//       monster.delete()
//         .then(res.sendStatus(204));
//     } else {
//       return send404(id, res);
//     }
//   } catch (e: unknown) {
//     res.status(500).send(extractMessage(e));
//   }
// });