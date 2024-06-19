import { PartialType } from "@nestjs/mapped-types";
import { CategoriasCreateDto } from "./categorias.create.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CategoriaUpdateDto extends PartialType(CategoriasCreateDto) {
  @ApiProperty({
    description: "Nome da categoria",
    type: String,
    example: "Grãos e Cereais",
    required: true,
    uniqueItems: true,
    maxLength: 255,
  })
  nome: string;
}
