import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CategoriasCreateDto {
  @ApiProperty({
    example: "Frutas",
    description: "Nome da categoria",
    uniqueItems: true,
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @MaxLength(255)
  nome: string;
}
