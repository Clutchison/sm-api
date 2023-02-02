import { Response } from 'express';

export const extractMessage = (e: unknown): string => {
  if (typeof e === 'string') {
    return e;
  } else if (e instanceof Error) {
    return e.message;
  } else {
    return JSON.stringify(e, null, 4);
  }
}

export const send404ForResource = (resourceName: string) =>
  (id: string | undefined, res: Response) =>
    res.status(404).send(resourceName + ' not found with id: ' + id);

export type ObjectValues<T> = T[keyof T];

type _Range<T extends number, R extends unknown[]> = R['length'] extends T ? R[number] : _Range<T, [R['length'], ...R]>;
export type Ran<T extends number> = number extends T ? number : _Range<T, []>;