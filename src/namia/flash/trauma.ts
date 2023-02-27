const TRAUMA = {
  FARAH: 'farah',
  VEHNA: 'vehna',
  RHYS: 'rhys',
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
type traumaIndex = 1 | 2 | 3 | 4;

const people: Person[] = Object.values(PEOPLE);
const traumas: Trauma[] = Object.values(TRAUMA);

export type Roll = { [key in Trauma]: traumaIndex }

const generateRoll

export const rollTrauma = (roll: Roll) => {
  const rolls: Person[][] = [[], [], [], []]
  people.forEach(person => {
    const roll: number = randomInt(traumas.length);
    rolls[roll]?.push(person);
  });
  const sortedRolls: Person[][] = rolls.sort((n1, n2) => n2.length - n1.length);
  console.log('Sorted Rolls: ' + JSON.stringify(sortedRolls, null, 4));

  return {
    'damon': sortedRolls[3],
    'rhys': sortedRolls[2],
    'vehna': sortedRolls[1],
    'farah': sortedRolls[0],
  };
}