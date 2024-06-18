import { PartialType } from "@nestjs/swagger";
import { ProdutoCreateDTO } from "./produto.create.dto";

export default class ProdutoUpdateDTO extends PartialType(ProdutoCreateDTO) {}
