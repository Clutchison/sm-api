import mongoose from "mongoose";
import { ItemGroup, ITEM_GROUP } from "./item-group";
import { ItemRecord } from "./item-record";

export type Item = {
    name: string;
    price: number;
    url: string;
    grouping: ItemGroup;
}


export interface ItemDoc extends mongoose.Document, Item {
    _doc: ItemDoc;
}

interface ItemModelInterface extends mongoose.Model<ItemDoc> {
    record: typeof ItemRecord;
    build(item: Item): ItemDoc;
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
        unique: false,
    },
    url: {
        type: String,
        required: true,
        unique: false,
    },
    grouping: {
        type: String,
        required: true,
        enum: Object.values(ITEM_GROUP),
        unique: false,
    },
}, { optimisticConcurrency: true });

itemSchema.statics.build = (attr: Item) => { return new ItemModel(attr) };
export const ItemModel = mongoose.model<ItemDoc, ItemModelInterface>('item', itemSchema);
ItemModel.record = ItemRecord;
