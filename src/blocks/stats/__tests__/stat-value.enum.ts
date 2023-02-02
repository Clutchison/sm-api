import { StatValue, parseStatValue } from '../stat-value.range';


describe('parseStatValue', () => {

  it('should return a stat value for a number within range 0-30', () => {
    const zero: StatValue | null = parseStatValue(0);
    const fifteen: StatValue | null = parseStatValue(15);
    const thirty: StatValue | null = parseStatValue(30);

    expect(zero).toEqual(0);
    expect(fifteen).toEqual(15);
    expect(thirty).toEqual(30);
  });

  it('should return null for a number outside of the range 0-30', () => {
    const negativeone: StatValue | null = parseStatValue(-1);
    const thirtyOne: StatValue | null = parseStatValue(31);

    expect(negativeone).toEqual(null);
    expect(thirtyOne).toEqual(null);
  });
});