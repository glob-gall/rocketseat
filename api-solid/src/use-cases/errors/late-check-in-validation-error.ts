export class LateCheckinValidationError extends Error {
  constructor() {
    super('check-in cant be validated after 20 minutes.')
  }
}