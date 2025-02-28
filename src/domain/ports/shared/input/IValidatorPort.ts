export interface ValidationResult<T> {
    isValid: boolean;
    errors?: string[];
    data?: T;
}

export interface IValidatorPort<T> {
    validate(input: unknown): ValidationResult<T>;
} 