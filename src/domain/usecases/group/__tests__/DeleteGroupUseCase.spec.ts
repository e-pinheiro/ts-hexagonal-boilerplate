import { DeleteGroupUseCase } from '../DeleteGroupUseCase';
import { IGroupRepository } from '../../../ports/IGroupRepository';

describe('DeleteGroupUseCase', () => {
  let mockGroupRepository: jest.Mocked<IGroupRepository>;
  let deleteGroupUseCase: DeleteGroupUseCase;

  beforeEach(() => {
    mockGroupRepository = {
      delete: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    };
    deleteGroupUseCase = new DeleteGroupUseCase(mockGroupRepository);
  });

  it('should delete a group successfully', async () => {
    // Arrange
    const groupId = 'valid-group-id';
    mockGroupRepository.delete.mockResolvedValue();

    // Act
    await deleteGroupUseCase.execute(groupId);

    // Assert
    expect(mockGroupRepository.delete).toHaveBeenCalledWith(groupId);
    expect(mockGroupRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('should propagate repository errors', async () => {
    // Arrange
    const groupId = 'invalid-group-id';
    const error = new Error('Failed to delete group');
    mockGroupRepository.delete.mockRejectedValue(error);

    // Act & Assert
    await expect(deleteGroupUseCase.execute(groupId)).rejects.toThrow(error);
    expect(mockGroupRepository.delete).toHaveBeenCalledWith(groupId);
    expect(mockGroupRepository.delete).toHaveBeenCalledTimes(1);
  });
});
