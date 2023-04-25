import { Record, Number, Boolean } from 'runtypes';

export const PartyRecord = Record({
    fee: Number,
    daysUntilDue: Number,
    active: Boolean,
});
