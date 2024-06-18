import { PartialType } from "@nestjs/mapped-types";
import { CategoriasCreateDto } from "./categorias.create.dto";

export class CategoriaUpdateDto extends PartialType(CategoriasCreateDto) {}
