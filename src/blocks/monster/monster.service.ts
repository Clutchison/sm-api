import mongoose, { Types } from 'mongoose';
import { Monster, MonsterDoc, MonsterInterface } from './monster.model';

type MonsterDocWithId = (MonsterDoc & {
  _id: Types.ObjectId;
});

export class MonsterService {

  public static create = async (newMonster: MonsterInterface): Promise<MonsterDoc> => {
    const savedMonser = Monster.build(newMonster);
    return savedMonser.save();
  }

  public static update = async (updatedMonser: MonsterInterface): Promise<MonsterDocWithId> => {

  }

  public static getById = async (id: string): Promise<MonsterDocWithId | null> => {
    if (!MonsterService.idIsValid(id)) return null;
    return await Monster.findById(id);
  }


  public static getAll = async (): Promise<MonsterDocWithId[]> => {
    return await Monster.find();
  }

  private static idIsValid = mongoose.Types.ObjectId.isValid;
}