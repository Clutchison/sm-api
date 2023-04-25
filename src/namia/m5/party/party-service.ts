import mongoose, { Types } from 'mongoose';
import { PartyModel, PartyDoc, Party } from './party'
import InvalIdIdError from '../../../common/errs/InvalidIdError';

type PartyDocWithId = (PartyDoc & {
    _id: Types.ObjectId;
});

const create = async (newParty: Party): Promise<PartyDoc> => {
    // const checked = PartyModel.record.check(newParty);
    const built = PartyModel.build(newParty);
    const saved = built.save();
    return saved;
}

const getAll = async (): Promise<PartyDocWithId[]> => {
    return PartyModel.find();
}

const getById = async (id: string | undefined): Promise<PartyDocWithId | null> => {
    if (!idIsValid(id || '')) throw new InvalIdIdError(id);
    return PartyModel.findById(id);
}

const getActive = async (): Promise<PartyDocWithId | null> => {
    return PartyModel.findOne({ active: true });
}

const update = async (updatedParty: Party, id: string | undefined):
    Promise<PartyDocWithId | null> => {
    const existingParty = await (idIsValid(id || '') ? getById(id) : getActive());
    if (!existingParty) return null;

    Object.keys(existingParty._doc).forEach(k => {
        if (!k.match(`^_.*`)) {
            const newValue = (updatedParty as any)[k];
            if (newValue !== undefined) (existingParty as any)[k] = newValue;
        }
    })

    return existingParty.save();
}

const deleteById = async (id: string | undefined): Promise<PartyDocWithId | null> => {
    const party = await getById(id);
    return party ? party.delete() : null;
}

const idIsValid = mongoose.Types.ObjectId.isValid;

export default {
    create,
    getAll,
    getById,
    getActive,
    update,
    deleteById,
};
