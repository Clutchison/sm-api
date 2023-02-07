import { ObjectValues } from '../../common/util/object-values';

const STAT = {
  STRENGTH: 'STR',
  DEXTERITY: 'DEX',
  CONSTITUTION: 'CON',
  INTELIGENCE: 'INT',
  WISDOM: 'WIS',
  CHARISMA: 'CHA',
} as const;

export type Stat = ObjectValues<typeof STAT>;

export type Stats = { [key in Stat]: number }

export const STATS_PROPS = {
  min: 0,
  max: 30,
} as const;