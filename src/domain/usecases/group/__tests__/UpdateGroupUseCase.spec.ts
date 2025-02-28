import { UpdateGroupUseCase } from '../UpdateGroupUseCase';
import { IGroupRepository } from '../../../ports/IGroupRepository';
import { Group } from '../../../entities/Group';
import { UpdateGroupDTO } from '../../../dtos/group.dto';

describe('UpdateGroupUseCase', () => {
    let groupRepository: jest.Mocked<IGroupRepository>;
    let updateGroupUseCase: UpdateGroupUseCase;

    const mockGroup = new Group({
        name: 'Test Group',
        description: 'Test Description'
    });

    const mockUpdateData: UpdateGroupDTO = {
        name: 'Updated Group'

    };

    beforeEach(() => {
        groupRepository = {
            findById: jest.fn(),
            update: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            findAll: jest.fn(),
        };

        updateGroupUseCase = new UpdateGroupUseCase(groupRepository);
    });

    it('should successfully update a group when it exists', async () => {
        // Arrange
        const groupId = '123';
        const updatedGroup = Group.restore(groupId, mockUpdateData);

        groupRepository.findById.mockResolvedValue(mockGroup);
        groupRepository.update.mockResolvedValue(updatedGroup);

        // Act
        const result = await updateGroupUseCase.execute(groupId, mockUpdateData);

        // Assert
        expect(groupRepository.findById).toHaveBeenCalledWith(groupId);
        expect(groupRepository.update).toHaveBeenCalledWith(groupId, updatedGroup);
        expect(result).toEqual(updatedGroup);
    });

    it('should return null when group does not exist', async () => {
        // Arrange
        const groupId = '123';
        groupRepository.findById.mockResolvedValue(null);

        // Act
        const result = await updateGroupUseCase.execute(groupId, mockUpdateData);

        // Assert
        expect(groupRepository.findById).toHaveBeenCalledWith(groupId);
        expect(groupRepository.update).not.toHaveBeenCalled();
        expect(result).toBeNull();
    });
}); 