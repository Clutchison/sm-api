import { randomInt } from 'crypto';
import { Types } from 'mongoose';
import { Item } from '../../item/item';
import { ITEM_GROUP } from '../../item/item-group';
import itemService, { ItemDocWithId } from '../../item/item-service';
import { ContentsDoc, ContentsModel } from './contents';

type ContentsDocWithId = (ContentsDoc & {
    _id: Types.ObjectId;
});

const generate = async (): Promise<ContentsDoc> =>
    ContentsModel.build({
        items: await generateItems(),
        active: true })
        .save();

const generateItems = async (): Promise<ItemDocWithId[]> => {
    const groups = Object.values(ITEM_GROUP);
    const items: ItemDocWithId[] = [];
    for (var _ in new Array(5).fill(0)) {
        const group = groups[randomInt(Object.values(ITEM_GROUP).length)];
        if (group === undefined) continue;
        const foundItems = await itemService.getRandomItems({ grouping: group }, 1);
        items.push(foundItems[0]);
        if (items.filter(i => i.grouping === group).length > 1)
            delete groups[groups.indexOf(group)];
    }
    return items;
}

export default {
    generate,
};
