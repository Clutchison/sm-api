import { Order } from './order.enum';
import { Morality } from './morality.enum';
import { ObjectValues } from '../../common/util/object-values';

export const ALIGNMENT = {
  UNALIGNED: 'unaligned',
  LAWFUL_GOOD: 'lawful good',
  LAWFUL_EVIL: 'lawful evil',
  LAWFUL_NEUTRAL: 'lawful neutral',
  NEUTRAL_GOOD: 'neutral good',
  TRUE_NEUTRAL: 'true neutral',
  NEUTRAL_EVIL: 'neutral evil',
  CHAOTIC_GOOD: 'chaotic good',
  CHAOTIC_NEUTRAL: 'chaotic neutral',
  CHAOTIC_EVIL: 'chaotic evil',
} as const;

export type Alignment = ObjectValues<typeof ALIGNMENT>;

export const parseAlignment = (order: Order, morality: Morality): Alignment => {
  switch (order + ' ' + morality) {
    case 'neutral neutral':
      return 'true neutral';
    case ' ':
      return 'unaligned';
    default:
      return order + ' ' + morality as Alignment;
  }
}