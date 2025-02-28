import { ListGroupsUseCase } from '../ListGroupsUseCase';
import { IGroupRepository } from '../../../ports/IGroupRepository';
import { Group } from '../../../entities/Group';

describe('ListGroupsUseCase', () => {
  let mockGroupRepository: jest.Mocked<IGroupRepository>;
  let listGroupsUseCase: ListGroupsUseCase;

  beforeEach(() => {
    // Create a mock repository
    mockGroupRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    // Initialize the use case with the mock repository
    listGroupsUseCase = new ListGroupsUseCase(mockGroupRepository);
  });

  it('should return empty array when no groups exist', async () => {
    // Arrange
    mockGroupRepository.findAll.mockResolvedValue([]);

    // Act
    const result = await listGroupsUseCase.execute();

    // Assert
    expect(result).toEqual([]);
    expect(mockGroupRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return mapped groups when groups exist', async () => {
    // Arrange
    const mockGroups = [
      Group.restore('1', {
        name: 'Group 1',
        description: 'Description 1',
        createdAt: new Date('2024-01-01')
      }),
      Group.restore('2', {
        name: 'Group 2',
        description: 'Description 2',
        createdAt: new Date('2024-01-02')
      })
    ];

    mockGroupRepository.findAll.mockResolvedValue(mockGroups);

    // Act
    const result = await listGroupsUseCase.execute();

    // Assert
    expect(result).toEqual([
      {
        id: '1',
        name: 'Group 1',
        description: 'Description 1',
        createdAt: mockGroups[0].createdAt
      },
      {
        id: '2',
        name: 'Group 2',
        description: 'Description 2',
        createdAt: mockGroups[1].createdAt
      }
    ]);
    expect(mockGroupRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should handle repository errors', async () => {
    // Arrange
    const error = new Error('Database error');
    mockGroupRepository.findAll.mockRejectedValue(error);

    // Act & Assert
    await expect(listGroupsUseCase.execute()).rejects.toThrow('Database error');
    expect(mockGroupRepository.findAll).toHaveBeenCalledTimes(1);
  });
}); 