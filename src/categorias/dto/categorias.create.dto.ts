import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CategoriasCreateDto {
  @ApiProperty({
    description: "Nome da categoria",
    type: String,
    example: "Frutas",
    required: true,
    uniqueItems: true,
    maxLength: 255,
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @MaxLength(255)
  nome: string;
}
