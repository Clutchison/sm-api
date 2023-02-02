import { Order } from './order.enum';
import { Morality } from './morality.enum';
import { ObjectValues } from '../../common/util/object-values';

export const ALIGNMENT = {
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

type Alignment = ObjectValues<typeof ALIGNMENT>;

const parseAlignment = (order: Order, morality: Morality): Alignment =>
  order === morality ? 'true neutral' : (order + ' ' + morality) as Alignment;

export { Alignment, parseAlignment };