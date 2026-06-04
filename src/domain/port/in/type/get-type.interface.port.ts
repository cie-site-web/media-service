import { TypeEntity } from "src/domain/entities/type.entity";

export interface GetTypeInterfacePort {
  execute(publicId: string): Promise<TypeEntity>;
}
