import { ObjectValues } from '../../common/util';

const MORALITY = {
  GOOD: 'good',
  NEUTRAL: 'neutral',
  EVIL: 'evil',
} as const;

export type Morality = ObjectValues<typeof MORALITY>;