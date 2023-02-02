import { StatValue } from './stat-value.range';
import { Stat } from './stat.enum';

export type Stats = { [key in Stat]: StatValue }