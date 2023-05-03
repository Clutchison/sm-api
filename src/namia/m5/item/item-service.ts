import { DeleteResult, ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { NumberFilter } from '../../../common/util/object-values';
import { Item, ItemDoc, ItemModel } from './item';
import { ItemGroup, ITEM_GROUP } from './item-group';

export type ItemDocWithId = (ItemDoc & {
    _id: Types.ObjectId;
});

export type ItemFilters = {
    _id?: ObjectId | { $in: ObjectId[] },
    name?: string | RegExp,
    price?: number | NumberFilter,
    grouping?: ItemGroup | ItemGroup[],
    $nor?: ItemFilters[];
}

const create = async (newItem: Item): Promise<ItemDoc> =>
    ItemModel.build(newItem).save();

const createAll = async (newItems: Item[]): Promise<ItemDoc[]> =>
    ItemModel.create(newItems);

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
                imported: true,
            };
        }).filter(i => !!i.name);
}

const getAll = async (filters: ItemFilters): Promise<ItemDocWithId[]> =>
    filters ? ItemModel.find(filters) : ItemModel.find();

const getRandomItems = (filters: ItemFilters, limit: number) =>
    ItemModel.aggregate([
        { $match: filters },
        { $sample: { size: limit } }
    ]);

const getByName = async (name: string | undefined): Promise<ItemDocWithId | null> =>
    ItemModel.findOne({ name });

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

const deleteImported = async (): Promise<DeleteResult> =>
    ItemModel.deleteMany({ imported: true })

export default {
    create,
    createAll,
    parseItems,
    getAll,
    getByName,
    getRandomItems,
    update,
    deleteByName,
    deleteImported,
};
