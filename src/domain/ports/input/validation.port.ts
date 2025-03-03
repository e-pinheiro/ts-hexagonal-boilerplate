export interface ValidationResult<T> {
  isValid: boolean;
  errors?: string[];
  data?: T;
}

export interface ValidatorPort<T> {
  validate(input: unknown): ValidationResult<T>;
}
