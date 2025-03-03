import { CreateGroupUseCase } from '../CreateGroupUseCase';
import { IGroupRepository } from '../../../ports/IGroupRepository';
import { Group } from '../../../entities/Group';
import { CreateGroupInputDTO } from '../../../dtos/group.dto';

describe('CreateGroupUseCase', () => {
  let createGroupUseCase: CreateGroupUseCase;
  let mockGroupRepository: jest.Mocked<IGroupRepository>;

  beforeEach(() => {
    // Create a mock repository
    mockGroupRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    // Initialize the use case with the mock repository
    createGroupUseCase = new CreateGroupUseCase(mockGroupRepository);
  });

  it('should create a new group successfully', async () => {
    // Arrange
    const inputData: CreateGroupInputDTO = {
      name: 'Test Group',
    };

    const expectedGroup = new Group({ name: inputData.name });
    mockGroupRepository.save.mockResolvedValue(expectedGroup);

    // Act
    const result = await createGroupUseCase.execute(inputData);

    // Assert
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(mockGroupRepository.save).toHaveBeenCalledTimes(1);
    expect(mockGroupRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        name: inputData.name,
      }),
    );
  });

  it('should throw an error if repository save fails', async () => {
    // Arrange
    const inputData: CreateGroupInputDTO = {
      name: 'Test Group',
    };

    const expectedError = new Error('Failed to save group');
    mockGroupRepository.save.mockRejectedValue(expectedError);

    // Act & Assert
    await expect(createGroupUseCase.execute(inputData)).rejects.toThrow(
      expectedError,
    );
    expect(mockGroupRepository.save).toHaveBeenCalledTimes(1);
  });
});
