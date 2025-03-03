export interface ValidationRule {
  validate(value: unknown): void;
}
