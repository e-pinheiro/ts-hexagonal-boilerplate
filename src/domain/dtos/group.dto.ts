export interface CreateGroupDTO {
  name: string;
  description?: string;
  members: string[];
  isPrivate: boolean;
  maxMembers?: number;
}

export interface CreateGroupOutputDTO {
  id: string;
}

export interface UpdateGroupDTO {
  name: string;
} 