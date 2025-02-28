export interface IDeleteGroupUseCase {
    execute(id: string): Promise<void>;
} 