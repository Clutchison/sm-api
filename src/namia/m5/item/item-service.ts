import { Types } from 'mongoose';
import { Item, ItemDoc, ItemModel } from './item';

type ItemDocWithId = (ItemDoc & {
  _id: Types.ObjectId;
});

const create = async (newItem: Item): Promise<ItemDoc> => {
  // const checked = ItemModel.record.check(newItem);
  const built = ItemModel.build(newItem);
  const saved = built.save();
  return saved;
}

const getAll = async (): Promise<ItemDocWithId[]> => {
  return ItemModel.find();
}

const getByName = async (name: string | undefined): Promise<ItemDocWithId | null> => {
  return ItemModel.findOne({ name });
}

const update = async (updatedItem: Item, name: string | undefined):
  Promise<ItemDocWithId | null> => {
  const existingItem = await getByName(name);
  if (!existingItem) return null;

  Object.keys(existingItem._doc).forEach(k => {
    if (!k.match(`^_.*`)) {
      const newValue = (updatedItem as any)[k];
      if (newValue !== undefined) (existingItem as any)[k] = newValue;
    }
  })

  return existingItem.save();
}

const deleteByName = async (name: string | undefined): Promise<ItemDocWithId | null> => {
  const item = await getByName(name);
  return item ? item.delete() : null;
}

export default {
  create,
  getAll,
  getByName,
  update,
  deleteByName,
};
