import { Record, Number as RuntypeNumber } from 'runtypes';
import { ObjectValues } from '../common/util/object-values';
import mongoose from 'mongoose';

const SENSE = {
  DARKVISION: 'darkvision',
  TREMORSENSE: 'tremorsense',
  TRUESIGHT: 'truesight',
  BLINDSIGHT: 'blindsight',
} as const;

export type Sense = ObjectValues<typeof SENSE>;

const SENSE_PROPS = {
  min: 0,
  max: 300,
} as const;

export type SenseRanges = { [value in Sense]?: number }

export const senseRangesSchema = new mongoose.Schema({
  darkvision: {
    type: Number,
    min: SENSE_PROPS.min,
    max: SENSE_PROPS.max,
    required: false
  },
  tremorsense: {
    type: Number,
    min: SENSE_PROPS.min,
    max: SENSE_PROPS.max,
    required: false
  },
  truesight: {
    type: Number,
    min: SENSE_PROPS.min,
    max: SENSE_PROPS.max,
    required: false
  },
  blindsight: {
    type: Number,
    min: SENSE_PROPS.min,
    max: SENSE_PROPS.max,
    required: false
  },
});

const senseConstraint = (n: number) => n >= SENSE_PROPS.min && n <= SENSE_PROPS.max;
const opts = (sense: string) => {
  return { name: sense + ' in range (' + SENSE_PROPS.min + '-' + SENSE_PROPS.max + ')' }
}

export const SenseRecord = Record({
  darkvision: RuntypeNumber.withConstraint(senseConstraint, opts('blindsight')).optional(),
  tremorsense: RuntypeNumber.withConstraint(senseConstraint, opts('blindsight')).optional(),
  truesight: RuntypeNumber.withConstraint(senseConstraint, opts('blindsight')).optional(),
  blindsight: RuntypeNumber.withConstraint(senseConstraint, opts('blindsight')).optional(),
});