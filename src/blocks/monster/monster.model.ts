import mongoose from "mongoose";
import { Size } from "../size.enum";
import { Alignment } from "../alignment/alignment.enum";
import { Stats } from '../stats/stats.model';

// todo: Require appropriate properties
export interface MonsterInterface {
  name: string;
  size?: Size;
  alignment?: Alignment;
  ac?: number;
  hpMax?: number;
  hpCurrent?: number;
  speed?: number;
  stats?: Stats;
  // skills?: Skill[];
  vulnerablities?: string;
  immunities?: string;
  // senses?: SenseRange[];
  description: string;
  cr: number;
}

interface MonsterDoc extends mongoose.Document {
  name: string;
  description: string;
  cr: number;
}

interface MonsterModelInterface extends mongoose.Model<MonsterDoc> {
  build(monster: MonsterInterface): MonsterDoc;
}

const monsterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cr: {
    type: Number,
    required: true,
  },
}, { optimisticConcurrency: true });

monsterSchema.pre('save', function (next) {
  this.increment();
  return next();
});

monsterSchema.statics.build = (attr: MonsterInterface) => { return new Monster(attr) };

export const Monster = mongoose.model<MonsterDoc, MonsterModelInterface>('monster', monsterSchema);