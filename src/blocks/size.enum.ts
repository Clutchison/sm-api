import { ObjectValues } from '../common/util/object-values';

const SIZE = {
  TINY: 'tiny',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  HUGE: 'huge',
  GARGANTUAN: 'gargantuan',
} as const;

export type Size = ObjectValues<typeof SIZE>;