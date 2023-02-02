type Ran<T extends number> = number extends T ? number : _Range<T, []>;
type _Range<T extends number, R extends unknown[]> = R['length'] extends T ? R[number] : _Range<T, [R['length'], ...R]>;

type StatValue = Ran<31>;

const parseStatValue = (n: number): StatValue | null => n < 0 || n > 30 ? null : n as StatValue;

export { StatValue, parseStatValue };