import express, { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';
import { send404ForResource } from '../../common/util/send-404';
import { extractMessage } from '../../common/util/extract-message';
import { MonsterService } from './monster.service';
import { ValidationError as RunTypesError } from 'runtypes';
import { Monster } from './monster.model';

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
    const erz = MonsterService.throwError();
    return res.status(200).send(erz);
    // const id: string | undefined = req.params.id;
    // if (id === undefined) return send404(id, res);
    // const monster = await MonsterService.getById(id);
    // if (monster) return res.status(200).send(monster);
    // else return send404(id, res);
  } catch (e: unknown) {
    res.status(500).send(extractMessage(e));
  }
});

// POST Monster
monsterRouter.post("/", async (req: Request, res: Response) => {
  try {
    const monster = await MonsterService.create(req.body);
    return res.status(201).json(monster);
  } catch (e: unknown) {
    if (e instanceof RunTypesError) {
      return res.status(400).json(errorBody(
        'Error parsing request to Monster',
        e.details));
    } else if (e instanceof MongooseError.ValidationError) {
      return res.status(400).json(errorBody(
        'Error saving new Monster',
        Object.values(e.errors).map((err) => err.message)));
    } else if ((e as MongoError).code === 11000) {
      return res.status(400).json(errorBody(
        'A user with this this unique key already exists!'
      ));
    }
    res.status(500).json(errorBody('Internal server error', e));
  }
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

const errorBody = (message: string, details?: any): { success: false, message: string, details?: any } => {
  const body = {
    success: false,
    message: message
  } as const;
  return details ? { ...body, details } : body;
}