import { ObjectValues } from '../common/util/object-values';

const SENSE = {
  DARKVISION: 'darkvision',
  TREMORSENSE: 'tremorsense',
  TRUESIGHT: 'truesight',
  BLINDSIGHT: 'blindsight',
} as const;

export type Sense = ObjectValues<typeof SENSE>;

export type SenseRanges = { [value in Sense]?: number }