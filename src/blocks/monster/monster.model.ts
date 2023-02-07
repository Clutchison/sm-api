import mongoose from "mongoose";
import { SIZE, Size } from "../size";
import { ALIGNMENT, Alignment } from "../alignment/alignment.enum";
import { statsSchema } from '../stats/stats.schema';
import { SKILL, Skill } from '../skill';
import { CHALLENGE_RATING, ChallengeRating } from './challenge-rating';
import { SenseRanges, senseRangesSchema } from '../sense';
import { SpeedConfig } from '../speed';
import { ACProps } from '../ac';
import { HPProps } from '../hp';
import { MonsterRecord } from './monster.record';
import { InvalidMonsterError } from '../errs/invalid-monster-error';
import { Stats } from '../stats/stats';

// todo: Require appropriate properties
export type Monster = {
  name: string;
  description?: string;
  size?: Size;
  type?: string;
  alignment?: Alignment;
  ac?: number;
  hpMax: number;
  hpCurrent: number;
  hpTemp?: number;
  speed?: number;
  stats?: Stats;
  skills?: Skill[];
  vulnerablities?: string;
  resistances?: string;
  immunities?: string;
  senses?: SenseRanges;
  languages?: string[];
  cr?: ChallengeRating;
}

export interface MonsterDoc extends mongoose.Document, Monster {
  _doc: MonsterDoc;
}

interface MonsterModelInterface extends mongoose.Model<MonsterDoc> {
  record: typeof MonsterRecord;
  build(monster: Monster): MonsterDoc;
}

const monsterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    enum: Object.values(SIZE),
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  alignment: {
    type: String,
    enum: Object.values(ALIGNMENT),
    required: false,
  },
  ac: {
    type: Number,
    min: ACProps.min,
    max: ACProps.max,
    required: false,
  },
  hpMax: {
    type: Number,
    min: 0,
    max: HPProps.max,
    required: true,
  },
  hpCurrent: {
    type: Number,
    min: HPProps.min,
    max: HPProps.max,
    required: true,
  },
  hpTemp: {
    type: Number,
    min: 0,
    max: HPProps.max,
    required: false,
  },
  speed: {
    type: Number,
    min: SpeedConfig.min,
    max: SpeedConfig.max,
    required: false,
  },
  stats: {
    type: statsSchema,
    required: true
  },
  skills: {
    type: [String],
    enum: Object.values(SKILL),
    required: false,
  },
  vulnerabilities: {
    type: String,
    required: false,
  },
  resistances: {
    type: String,
    required: false,
  },
  immunities: {
    type: String,
    required: false,
  },
  senses: {
    type: senseRangesSchema,
    required: false,
  },
  languages: {
    type: [String],
    required: false,
  },
  cr: {
    type: String,
    enum: Object.values(CHALLENGE_RATING),
    required: false,
  },
}, { optimisticConcurrency: true });

monsterSchema.pre('save', function (next) {
  this.increment();
  this.languages = [...new Set(this.languages)];
  this.skills = [...new Set(this.skills)];
  return next();
});

monsterSchema.pre('validate', function (next) {
  if (this.hpCurrent > this.hpMax) {
    next(new InvalidMonsterError(
      'Current HP (' + this.hpCurrent + ')' +
      ' cannot be higher than Max HP (' + this.hpMax + ')'));
  } else {
    next();
  }
});

monsterSchema.statics.build = (attr: Monster) => { return new MonsterModel(attr) };
export const MonsterModel = mongoose.model<MonsterDoc, MonsterModelInterface>('monster', monsterSchema);
MonsterModel.record = MonsterRecord;