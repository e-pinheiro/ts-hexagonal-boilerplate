import { GetGroupUseCase } from '../GetGroupUseCase';
import { IGroupRepository } from '../../../ports/IGroupRepository';
import { Group } from '../../../entities/Group';

describe('GetGroupUseCase', () => {
    let getGroupUseCase: GetGroupUseCase;
    let mockGroupRepository: jest.Mocked<IGroupRepository>;

    beforeEach(() => {
        mockGroupRepository = {
            findById: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
            delete: jest.fn(),
            update: jest.fn()
        };

        getGroupUseCase = new GetGroupUseCase(mockGroupRepository);
    });

    it('should return null when group is not found', async () => {
        // Arrange
        mockGroupRepository.findById.mockResolvedValue(null);
        const groupId = 'non-existent-id';

        // Act
        const result = await getGroupUseCase.execute(groupId);

        // Assert
        expect(result).toBeNull();
        expect(mockGroupRepository.findById).toHaveBeenCalledWith(groupId);
        expect(mockGroupRepository.findById).toHaveBeenCalledTimes(1);
    });

    it('should return group data when group is found', async () => {
        // Arrange
        const mockGroup = new Group({
            name: 'Test Group',
            description: 'Test Description',
            createdAt: new Date('2024-01-01'),
        });

        mockGroupRepository.findById.mockResolvedValue(mockGroup);

        // Act
        const result = await getGroupUseCase.execute('test-id');

        // Assert
        expect(result).toEqual({
            id: mockGroup.id,
            name: mockGroup.name,
            description: mockGroup.description,
            createdAt: mockGroup.createdAt,
        });
        expect(mockGroupRepository.findById).toHaveBeenCalledWith('test-id');
        expect(mockGroupRepository.findById).toHaveBeenCalledTimes(1);
    });
}); 