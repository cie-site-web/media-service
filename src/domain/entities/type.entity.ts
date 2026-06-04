import { TypeNameEnum } from "src/domain/enums/type-name.enum";
import { FormatEnum } from "src/domain/enums/format.enum";

export type TypeProps = {
  readonly id?: string;
  publicId: string;
  name: TypeNameEnum;
  format: FormatEnum;
  readonly createdAt?: Date;
};

export class TypeEntity {
  constructor(private readonly props: TypeProps) {}

  get id(): string | undefined {
    return this.props.id;
  }

  get publicId(): string {
    return this.props.publicId;
  }

  get name(): TypeNameEnum {
    return this.props.name;
  }

  get format(): FormatEnum {
    return this.props.format;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  update(updates: Partial<TypeProps>): TypeEntity {
    Object.assign(this.props, updates);
    return this;
  }
}
