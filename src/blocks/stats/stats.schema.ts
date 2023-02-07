import mongoose from 'mongoose';
import { STATS_PROPS } from './stats';


export const statsSchema = new mongoose.Schema({
  STR: {
    type: Number,
    min: STATS_PROPS.min,
    max: STATS_PROPS.max,
    required: true,
  },
  DEX: {
    type: Number,
    min: STATS_PROPS.min,
    max: STATS_PROPS.max,
    required: true,
  },
  CON: {
    type: Number,
    min: STATS_PROPS.min,
    max: STATS_PROPS.max,
    required: true,
  },
  INT: {
    type: Number,
    min: STATS_PROPS.min,
    max: STATS_PROPS.max,
    required: true,
  },
  WIS: {
    type: Number,
    min: STATS_PROPS.min,
    max: STATS_PROPS.max,
    required: true,
  },
  CHA: {
    type: Number,
    min: STATS_PROPS.min,
    max: STATS_PROPS.max,
    required: true,
  },
});