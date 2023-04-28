import mongoose from "mongoose";
import { Item } from "../../item/item";
import { ContentsRecord } from "./contents-record";

export type Contents = {
    items: Item[],
    active: boolean,
}

export interface ContentsDoc extends mongoose.Document, Contents {
    _doc: ContentsDoc;
}

interface ContentsModelInterface extends mongoose.Model<ContentsDoc> {
    record: typeof ContentsRecord;
    build(contents: Contents): ContentsDoc;
    buildAll(contentss: Contents[]): ContentsDoc[];
}

export const contentsSchema = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    }],
    active: {
        type: Boolean,
        required: false,
        default: false,
    },
}, { optimisticConcurrency: true });

contentsSchema.statics.build = (attr: Contents) => { return new ContentsModel(attr) };
contentsSchema.statics.buildAll = (attrs: Contents[]) => { return attrs.map(attr => new ContentsModel(attr)) };
export const ContentsModel = mongoose.model<ContentsDoc, ContentsModelInterface>('contents', contentsSchema);
ContentsModel.record = ContentsRecord;
