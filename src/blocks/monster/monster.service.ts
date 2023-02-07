import mongoose, { Types } from 'mongoose';
import { MonsterModel, MonsterDoc, Monster } from './monster.model';
import InvalIdIdError from '../../common/errs/InvalidIdError';

type MonsterDocWithId = (MonsterDoc & {
  _id: Types.ObjectId;
});

const create = async (newMonster: Monster): Promise<MonsterDoc> => {
  // const checked = MonsterModel.record.check(newMonster);
  const built = MonsterModel.build(newMonster);
  const saved = built.save();
  return saved;
  // return Monster.build(Monster.record.check(newMonster)).save();
}

const getAll = async (): Promise<MonsterDocWithId[]> => {
  return MonsterModel.find();
}

const getById = async (id: string | undefined): Promise<MonsterDocWithId | null> => {
  if (!idIsValid(id || '')) throw new InvalIdIdError(id);
  return MonsterModel.findById(id);
}

const update = async (updatedMonster: Monster, id: string | undefined):
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