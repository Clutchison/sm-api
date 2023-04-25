export class InvalidPartyError extends Error {

  public readonly details: string[];

  constructor(...details: string[]) {
    super('Error saving malformed Party');
    this.details = details;
  }
}
