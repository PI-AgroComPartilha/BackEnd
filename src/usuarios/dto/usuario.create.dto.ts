import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
} from "class-validator";

export class UsuarioCreateDTO {
  @ApiProperty({ example: "root" })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: "root@root.com" })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail()
  email: string;

  @ApiProperty({ example: "rootroot" })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Length(8, 16)
  senha: string;

  @ApiProperty({ examples: ["cliente", "vendedor", "admin"], default: "admin" })
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsIn(["vendedor", "cliente", "admin"])
  tipo: string;

  @ApiProperty({
    example:
      "https://conflictresolutionmn.org/wp-content/uploads/2020/01/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg",
  })
  @IsUrl()
  @IsOptional()
  foto: string;
}
