import { StatValue } from './stat-value.enum';
import { Stat } from './stat.enum';

export type Stats = { [key in Stat]: StatValue }