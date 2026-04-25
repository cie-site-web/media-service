import { IsNotEmpty, IsString } from "class-validator";

export class GetTypeDto {
  @IsString()
  @IsNotEmpty()
  publicId!: string;
}
