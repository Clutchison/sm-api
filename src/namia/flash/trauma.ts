const TRAUMA = {
  FARAH: 'farah',
  VEHNA: 'vehna',
  RENNYN: 'rennyn',
  DAMON: 'damon',
} as const;

const randomInt = (max: number) => Math.floor(Math.random() * max)

const PEOPLE = {
  RENNYN: 'rennyn',
  CLASP: 'clasp',
  VEHNA: 'vehna',
  DAMON: 'damon',
  RHYS: 'rhys'
}

type ObjectValues<T> = T[keyof T];

type Person = ObjectValues<typeof PEOPLE>;
type Trauma = ObjectValues<typeof TRAUMA>;

const people: Person[] = Object.values(PEOPLE);
const traumas: Trauma[] = Object.values(TRAUMA);

export type Rolls = { [key in Person]: number }

const generateIncomingRolls = (): Rolls => {
  return {
    rennyn: randomInt(4) + 1,
    clasp: randomInt(4) + 1,
    vehna: randomInt(4) + 1,
    damon: randomInt(4) + 1,
    rhys: randomInt(4) + 1,
  }
}

export const rollTrauma = (incomingRolls?: Rolls) => {
  const rolls: Person[][] = [[], [], [], []]
  Object.entries(incomingRolls || generateIncomingRolls())
    .forEach(entry => rolls[entry[1] - 1]?.push(entry[0]));
  const sortedRolls: Person[][] = rolls.sort((n1, n2) => n2.length - n1.length);
  return {
    'damon': sortedRolls[3],
    'rennyn': sortedRolls[2],
    'vehna': sortedRolls[1],
    'farah': sortedRolls[0],
  };
}