import { Entity } from '../framework/Entity';

interface GroupProps {
  name: string;
  createdAt?: Date;
  description?: string;
}

export class Group extends Entity<GroupProps> {
  constructor(props: GroupProps) {
    super({
      ...props,
      createdAt: props.createdAt ?? new Date()
    });
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  get description(): string | undefined {
    return this.props.description;
  }
} 