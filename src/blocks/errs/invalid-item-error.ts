export class InvalidItemError extends Error {

  public readonly details: string[];

  constructor(...details: string[]) {
    super('Error saving malformed Item');
    this.details = details;
  }
}
