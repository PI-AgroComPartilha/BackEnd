import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { UsuarioService } from "../services/usuarios.services";
import { Usuario } from "../entities/usuario.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsuarioCreateDTO } from "../dto/usuario.create.dto";
import { UsuarioUpdateDTO } from "../dto/usuario.update.dto";

@ApiTags("Usuario")
@Controller("/usuarios")
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiResponse({
    type: [Usuario],
  })
  @Get("/all")
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @ApiResponse({
    type: Usuario,
  })
  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  findById(@Param("id", ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
  }

  @ApiResponse({
    type: [Usuario],
  })
  @Get("/nome/:nome")
  @HttpCode(HttpStatus.OK)
  findByName(@Param("nome") name: string): Promise<Usuario[]> {
    return this.usuarioService.findByName(name);
  }

  @ApiResponse({
    type: [Usuario],
  })
  @Get("/email/:email")
  @HttpCode(HttpStatus.OK)
  findByEmail(@Param("email") email: string): Promise<Usuario> {
    return this.usuarioService.findByEmail(email);
  }

  @Post("/cadastrar")
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() usuario: UsuarioCreateDTO): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() usuario: UsuarioUpdateDTO
  ): Promise<Usuario> {
    return this.usuarioService.update(id, usuario);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.usuarioService.delete(id);
  }
}
