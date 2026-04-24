import { TypeNameEnum } from "src/domain/enums/type-name.enum";
import { FormatEnum, FormatForName } from "src/domain/enums/format.enum";

type TypeDiscriminatedProps =
  | { name: TypeNameEnum.DOC; format: FormatForName<TypeNameEnum.DOC> }
  | {
      name: TypeNameEnum.IMAGE;
      format: FormatForName<TypeNameEnum.IMAGE>;
    }
  | {
      name: TypeNameEnum.VIDEO;
      format: FormatForName<TypeNameEnum.VIDEO>;
    };

export type TypeProps = TypeDiscriminatedProps & {
  readonly id?: string;
  publicId: string;
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
