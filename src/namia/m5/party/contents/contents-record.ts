import { Record, Boolean, Array } from 'runtypes';
import { ItemRecord } from '../../item/item-record';

export const ContentsRecord = Record({
    items: Array(ItemRecord),
    active: Boolean,
});
