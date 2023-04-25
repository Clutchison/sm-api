import { String, Record, Number } from 'runtypes';

export const ItemRecord = Record({
  name: String,
  price: Number,
  url: String,
  grouping: String,
});
