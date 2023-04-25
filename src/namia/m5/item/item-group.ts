import { ObjectValues } from "../../../common/util/object-values";

export const ITEM_GROUP = {
    CONSUMABLE: 'Consumable',
    COMBAT: 'Combat',
    NON_COMBAT: 'Noncombat',
    SUMMONING: 'Summoning',
    GAME_CHANGING: 'Gamechanging',
} as const;

export type ItemGroup = ObjectValues<typeof ITEM_GROUP>;
