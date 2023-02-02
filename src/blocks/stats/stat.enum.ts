import { ObjectValues } from '../../common/util';

const STAT = {
  STRENGTH: 'STR',
  DEXTERITY: 'DEX',
  CONSTITUTION: 'CON',
  INTELIGENCE: 'INT',
  WISDOM: 'WIS',
  CHARISMA: 'CHA',
} as const;

export type Stat = ObjectValues<typeof STAT>;