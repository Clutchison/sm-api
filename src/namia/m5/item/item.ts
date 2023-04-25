import mongoose from "mongoose";
import { ItemRecord } from "./item-record";

export type Item = {
    name: string;
    price: number;
    url: string;
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
}, { optimisticConcurrency: true });

itemSchema.statics.build = (attr: Item) => { return new ItemModel(attr) };
export const ItemModel = mongoose.model<ItemDoc, ItemModelInterface>('item', itemSchema);
ItemModel.record = ItemRecord;
