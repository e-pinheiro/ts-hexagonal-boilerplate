export interface CreateGroupInputDTO {
  name: string;
  description?: string;
}

export interface CreateGroupOutputDTO {
  id: string;
}

export interface UpdateGroupDTO {
  name: string;
}
