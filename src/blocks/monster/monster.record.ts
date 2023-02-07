import { String, Record, Number } from 'runtypes';
import { HPProps } from '../hp';
import { StatsRecord } from '../stats/stats.record';
import { SenseRecord } from '../sense';

export const MonsterRecord = Record({
  name: String,
  hpMax: Number.withConstraint(n => n >= HPProps.min && n <= HPProps.max),
  hpCurrent: Number.withConstraint(n => n >= 0 && n <= HPProps.max),
  stats: StatsRecord,
  senses: SenseRecord.optional(),
});