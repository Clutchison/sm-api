import { Ran } from '../../common/util';

export type StatValue = Ran<31>;

export const parseStatValue = (n: number): StatValue | null =>
  n < 0 || n > 30 ? null : n as StatValue;
