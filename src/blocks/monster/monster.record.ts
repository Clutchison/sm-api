import { String, Record, Number } from 'runtypes';

export const MonsterRecord = Record({
  name: String,
  hpMax: Number.withConstraint(n => n >= -700 && n <= 700)
});