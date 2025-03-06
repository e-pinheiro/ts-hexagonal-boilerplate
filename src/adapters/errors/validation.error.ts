export class ValidationError extends Error {
  constructor(public readonly details: string[]) {
    super('Validation failed');
  }
}
