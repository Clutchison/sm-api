import mongoose from "mongoose";
import { ItemGroup, ITEM_GROUP } from "./item-group";
import { ItemRecord } from "./item-record";

export type Item = {
    name: string;
    price: number;
    url: string;
    grouping: ItemGroup;
    imported?: boolean;
}

export interface ItemDoc extends mongoose.Document, Item {
    _doc: ItemDoc;
}

interface ItemModelInterface extends mongoose.Model<ItemDoc> {
    record: typeof ItemRecord;
    build(item: Item): ItemDoc;
    buildAll(items: Item[]): ItemDoc[];
}

export type ItemFilter = {
    name?: string,
    price?: number | { $gte ?: number, $lt ?: number },
    group?: ItemGroup
}

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: false,
    },
    grouping: {
        type: String,
        required: true,
        enum: Object.values(ITEM_GROUP),
    },
    imported: {
        type: Boolean,
        required: false,
        default: false,
    },
}, { optimisticConcurrency: true });

itemSchema.statics.build = (attr: Item) => { return new ItemModel(attr) };
itemSchema.statics.buildAll = (attrs: Item[]) => { return attrs.map(attr => new ItemModel(attr)) };
export const ItemModel = mongoose.model<ItemDoc, ItemModelInterface>('item', itemSchema);
ItemModel.record = ItemRecord;
