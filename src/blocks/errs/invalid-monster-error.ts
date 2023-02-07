export class InvalidMonsterError extends Error {

  public readonly details: string[];

  constructor(...details: string[]) {
    super('Error saving malformed Monster');
    this.details = details;
  }
}