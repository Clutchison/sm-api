import { randomInt } from 'crypto';
import { Types } from 'mongoose';
import { ItemGroup, ITEM_GROUP } from '../../item/item-group';
import itemService, { ItemDocWithId, ItemFilters } from '../../item/item-service';
import { ContentsDoc, ContentsModel } from './contents';

type ContentsDocWithId = (ContentsDoc & {
    _id: Types.ObjectId;
});

const ALLOWED_GROUPS: ItemGroup[] = [
    'Combat',
    'Noncombat',
    'Consumable',
];

const generate = async (): Promise<ContentsDoc> =>
    ContentsModel.build({
        items: await generateItems(),
        active: true
    })
        .save();

// todo: Move to item service
const generateItems = async (): Promise<ItemDocWithId[]> => {
    let groups = [...ALLOWED_GROUPS];
    const items: ItemDocWithId[] = [];
    for (var _ in new Array(5).fill(0)) {
        const group = groups.at(randomInt(0, Object.values(groups).length));
        if (group === undefined) continue;
        let filters: ItemFilters = { grouping: group };
        if (items.length > 0) filters = { ...filters, $nor: [{ _id: { $in: items.map(i => i._id) } }] };
        const foundItems = await itemService.getRandomItems(filters, 1);
        items.push(foundItems[0]);
        if (items.filter(i => i.grouping === group).length > 1)
             groups = groups.filter(g => g !== group);
    }
    return items;
}

const getAll = async (): Promise<ContentsDocWithId[]> => ContentsModel.find();

export default {
    generate,
    getAll,
};
