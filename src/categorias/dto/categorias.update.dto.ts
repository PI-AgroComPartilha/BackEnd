import { PartialType } from "@nestjs/mapped-types";
import { Categoria } from "../entities/categoria.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CategoriaUpdateDto extends PartialType(Categoria) {
  @ApiProperty({
    description: "Nome da categoria",
    type: String,
    example: "Frutas",
    required: true,
    uniqueItems: true,
    maxLength: 255,
  })
  @IsNotEmpty()
  @MaxLength(255)
  nome: string;
}
