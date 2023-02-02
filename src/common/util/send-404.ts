import { Response } from 'express';

export const send404ForResource = (resourceName: string) =>
  (id: string | undefined, res: Response) =>
    res.status(404).send(resourceName + ' not found with id: ' + id);