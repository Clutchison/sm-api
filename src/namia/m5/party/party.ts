import mongoose from "mongoose";
import { PartyRecord } from "./party-record";

const BASE_FEE = 200;

export type Party = {
    fee: number;
    daysUntilDue: number;
    active: boolean;
}

export interface PartyDoc extends mongoose.Document, Party {
    _doc: PartyDoc;
}

interface PartyModelInterface extends mongoose.Model<PartyDoc> {
    record: typeof PartyRecord;
    build(party: Party): PartyDoc;
}

const partySchema = new mongoose.Schema({
    fee: {
        type: Number,
        required: true,
        default: BASE_FEE,
    },
    daysUntilDue: {
        type: Number,
        required: true,
        unique: false,
        default: 14,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { optimisticConcurrency: true });

partySchema.statics.build = (attr: Party) => { return new PartyModel(attr) };
export const PartyModel = mongoose.model<PartyDoc, PartyModelInterface>('party', partySchema);
PartyModel.record = PartyRecord;
