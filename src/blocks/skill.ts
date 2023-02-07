import { ObjectValues } from '../common/util/object-values';
import { Stat } from './stats/stats';

export const SKILL = {
  ACROBATICS: 'acrobatics',
  ANIMAL_HANDLING: 'animal handling',
  ARCANA: 'arcana',
  ATHLETICS: 'athletics',
  DECEPTION: 'deception',
  HISTORY: 'history',
  INSIGHT: 'insight',
  INTIMIDATION: 'intimidation',
  INVESTIGATION: 'investigation',
  MEDICINE: 'medicine',
  NATURE: 'nature',
  PERCEPTION: 'perception',
  PERFORMANCE: 'performance',
  PERSUASION: 'persuasion',
  RELIGION: 'religion',
  SLEIGHT_OF_HAND: 'sleight of hand',
  STEALTH: 'stealth',
  SURVIVAL: 'survival',
} as const;

export const skillStatMap: { [key in Skill]: Stat } = {
  'acrobatics': 'DEX',
  'animal handling': 'WIS',
  'arcana': 'INT',
  'athletics': 'STR',
  'deception': 'CHA',
  'history': 'INT',
  'insight': 'WIS',
  'intimidation': 'CHA',
  'investigation': 'INT',
  'medicine': 'WIS',
  'nature': 'INT',
  'perception': 'WIS',
  'performance': 'CHA',
  'persuasion': 'CHA',
  'religion': 'INT',
  'sleight of hand': 'DEX',
  'stealth': 'DEX',
  'survival': 'WIS'
} as const;

export type Skill = ObjectValues<typeof SKILL>;
