import { Record, Number } from 'runtypes';
import { STATS_PROPS } from './stats';

const statsConstraint = (n: number) => n >= STATS_PROPS.min && n <= STATS_PROPS.max;
const opts = (stat: string) => {
  return { name: stat + ' present and in range (' + STATS_PROPS.min + '-' + STATS_PROPS.max + ')' }
}

export const StatsRecord = Record({
  STR: Number.withConstraint(statsConstraint, opts('STR')),
  DEX: Number.withConstraint(statsConstraint, opts('DEX')),
  CON: Number.withConstraint(statsConstraint, opts('CON')),
  INT: Number.withConstraint(statsConstraint, opts('INT')),
  WIS: Number.withConstraint(statsConstraint, opts('WIS')),
  CHA: Number.withConstraint(statsConstraint, opts('CHA')),
});