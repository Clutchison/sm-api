export class InvalidContentsError extends Error {

  public readonly details: string[];

  constructor(...details: string[]) {
    super('Error saving malformed Contents');
    this.details = details;
  }
}
