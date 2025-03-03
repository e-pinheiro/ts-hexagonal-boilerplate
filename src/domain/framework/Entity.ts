export abstract class Entity<Props> {
  protected constructor(
    protected props: Props,
    protected _id: string = crypto.randomUUID(),
  ) {}

  get id(): string {
    return this._id;
  }

  static restore<T extends Entity<any>>(
    this: new (props: any) => T,
    id: string,
    props: any,
  ): T {
    const instance = new this(props);
    instance._id = id;
    return instance;
  }
}
