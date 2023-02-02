import { ObjectValues } from '../../common/util';

const ORDER = {
  LAWFUL: 'lawful',
  NEUTRAL: 'neutral',
  CHAOTIC: 'chaotic',
} as const;

export type Order = ObjectValues<typeof ORDER>;
