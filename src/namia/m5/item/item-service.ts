import { Types } from 'mongoose';
import { Item, ItemDoc, ItemModel } from './item';
import { ItemGroup, ITEM_GROUP } from './item-group';

type ItemDocWithId = (ItemDoc & {
    _id: Types.ObjectId;
});

const create = async (newItem: Item): Promise<ItemDoc> => {
    // const checked = ItemModel.record.check(newItem);
    const built = ItemModel.build(newItem);
    const saved = built.save();
    return saved;
}

const createAll = async (newItems: Item[]): Promise<ItemDoc[]> => {
    return ItemModel.create(newItems);
}

const parseItems = (data: string): Item[] => {
    return data.split('\n')
        .map(line => {
            const split = line.trim().split(';');
            const grouping: ItemGroup = Object.values(ITEM_GROUP)
                .find(s => split[2] === s) || 'Ungrouped';
            return {
                name: split[0] || '',
                price: Number.parseInt(split[1] || ''),
                url: '',
                grouping,
            };
        }).filter(i => i.name !== '');
}

const getAll = async (filters: Item): Promise<ItemDocWithId[]> => {
    return filters ? ItemModel.find(filters) : ItemModel.find();
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
    createAll,
    parseItems,
    getAll,
    getByName,
    update,
    deleteByName,
};
