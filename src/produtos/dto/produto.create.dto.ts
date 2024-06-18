import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  MaxLength,
} from "class-validator";

export class UserDTO {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  id: number;
}

export class CategoriaDTO {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  id: number;
}

export class ProdutoCreateDTO {
  @ApiProperty({
    example: "Alface",
    required: true,
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MaxLength(255)
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    example: "É verde e saudável.",
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsOptional()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({
    example: "https://www.rugol.com.br/pub/media/alface_extrato.jpg",
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  foto: string;

  @ApiProperty({
    example: 5.99,
  })
  @IsOptional()
  @IsNumber()
  preco: number;

  @ApiProperty({
    example: 10,
  })
  @IsOptional()
  quantidade: number;

  @ApiProperty({ type: UserDTO })
  categoria: CategoriaDTO;

  @ApiProperty({ type: UserDTO })
  usuario: UserDTO;
}
