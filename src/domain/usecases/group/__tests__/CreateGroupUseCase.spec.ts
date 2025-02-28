import { CreateGroupUseCase } from '../CreateGroupUseCase';
import { IGroupRepository } from '../../../ports/IGroupRepository';
import { Group } from '../../../entities/Group';
import { CreateGroupDTO } from '../../../dtos/group.dto';

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
    const groupData: CreateGroupDTO = {
      name: 'Test Group'
    };

    const expectedGroup = new Group({ name: groupData.name });
    mockGroupRepository.save.mockResolvedValue(expectedGroup);

    // Act
    const result = await createGroupUseCase.execute(groupData);

    // Assert
    expect(result).toHaveProperty('id');
    expect(mockGroupRepository.save).toHaveBeenCalledTimes(1);
    expect(mockGroupRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        name: groupData.name
      })
    );
  });

  it('should throw an error if repository save fails', async () => {
    // Arrange
    const groupData: CreateGroupDTO = {
      name: 'Test Group'
    };

    const expectedError = new Error('Failed to save group');
    mockGroupRepository.save.mockRejectedValue(expectedError);

    // Act & Assert
    await expect(createGroupUseCase.execute(groupData))
      .rejects
      .toThrow(expectedError);
  });
}); 