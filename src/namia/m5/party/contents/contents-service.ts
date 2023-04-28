import { DeleteResult } from 'mongodb';
import { Types } from 'mongoose';
import { Contents, ContentsDoc, ContentsModel } from './content';

type ContentsDocWithId = (ContentsDoc & {
    _id: Types.ObjectId;
});

const create = async (newContents: Contents): Promise<ContentsDoc> =>
    ContentsModel.build(newContents).built.save();


const createAll = async (newcontents: Contents[]): Promise<ContentsDoc[]> =>
    ContentsModel.create(newcontents);

const getAll = async (): Promise<ContentsDocWithId[]> => ContentsModel.find();

const getByName = async (name: string | undefined): Promise<ContentsDocWithId | null> =>
    ContentsModel.findOne({ name });

const update = async (updatedContents: Contents, name: string | undefined):
    Promise<ContentsDocWithId | null> => {
    const existingContents = await getByName(name);
    if (!existingContents) return null;

    Object.keys(existingContents._doc).forEach(k => {
        if (!k.match(`^_.*`)) {
            const newValue = (updatedContents as any)[k];
            if (newValue !== undefined) (existingContents as any)[k] = newValue;
        }
    })

    return existingContents.save();
}

const deleteByName = async (name: string | undefined): Promise<ContentsDocWithId | null> => {
    const content = await getByName(name);
    return content ? content.delete() : null;
}

const deleteImported = async (): Promise<DeleteResult> => ContentsModel.deleteMany({ imported: true })

export default {
    create,
    createAll,
    getAll,
    getByName,
    update,
    deleteByName,
    deleteImported,
};
