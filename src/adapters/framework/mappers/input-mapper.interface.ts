export interface InputMapper<T> {
  toInput(input: unknown): T;
}
