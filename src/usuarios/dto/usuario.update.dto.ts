import { PartialType } from "@nestjs/swagger";
import { UsuarioCreateDTO } from "./usuario.create.dto";

export class UsuarioUpdateDTO extends PartialType(UsuarioCreateDTO) {}
