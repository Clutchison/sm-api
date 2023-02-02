import { ObjectValues } from '../../common/util/object-values';

const ORDER = {
  LAWFUL: 'lawful',
  NEUTRAL: 'neutral',
  CHAOTIC: 'chaotic',
} as const;

export type Order = ObjectValues<typeof ORDER>;
