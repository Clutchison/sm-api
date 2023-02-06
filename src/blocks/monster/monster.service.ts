import mongoose, { Types } from 'mongoose';
import { Monster, MonsterDoc, MonsterInterface } from './monster.model';
import InvalIdIdError from '../../common/InvalidIdError';

type MonsterDocWithId = (MonsterDoc & {
  _id: Types.ObjectId;
});

const create = async (newMonster: MonsterInterface): Promise<MonsterDoc> => {
  return Monster.build(Monster.record.check(newMonster)).save();
}

const getAll = async (): Promise<MonsterDocWithId[]> => {
  return Monster.find();
}

const getById = async (id: string | undefined): Promise<MonsterDocWithId | null> => {
  if (!idIsValid(id || '')) throw new InvalIdIdError(id);
  return Monster.findById(id);
}

const update = async (updatedMonster: MonsterInterface, id: string | undefined):
  Promise<MonsterDocWithId | null> => {
  const existingMonster = await getById(id);
  if (!existingMonster) return null;

  Object.keys(existingMonster._doc).forEach(k => {
    if (!k.match(`^_.*`)) {
      const newValue = (updatedMonster as any)[k];
      if (newValue !== undefined) (existingMonster as any)[k] = newValue;
    }
  })

  return existingMonster.save();
}

const deleteById = async (id: string | undefined): Promise<MonsterDocWithId | null> => {
  const monster = await getById(id);
  return monster ? monster.delete() : null;
}

const idIsValid = mongoose.Types.ObjectId.isValid;

export default {
  create,
  getAll,
  getById,
  update,
  deleteById,
};