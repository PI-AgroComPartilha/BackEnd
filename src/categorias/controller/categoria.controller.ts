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
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entity";
import { DeleteResult } from "typeorm";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoriaUpdateDto } from "../dto/categorias.update.dto";
import { CategoriasCreateDto } from "../dto/categorias.create.dto";

@ApiTags("Categoria")
@Controller("/categorias")
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  @ApiResponse({
    type: [Categoria],
    description: "Listagem das categorias",
  })
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @ApiResponse({
    type: Categoria,
    description: "Encontra categoria pelo ID",
  })
  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async findById(@Param("id", ParseIntPipe) id: number): Promise<Categoria> {
    return this.categoriaService.findById(id);
  }

  @Get("nome/:nome")
  @HttpCode(HttpStatus.OK)
  async findByTipo(@Param("nome") nome: string): Promise<Categoria[]> {
    return this.categoriaService.findByNome(nome);
  }

  @ApiResponse({
    description: "Cria uma nova categoria",
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() categoria: CategoriasCreateDto): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  @ApiResponse({
    description: "Atualiza uma categoria",
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(":id")
  @HttpCode(HttpStatus.OK)
  update(
    @Param("id", ParseIntPipe)
    id: number,
    @Body() categoria: CategoriaUpdateDto
  ): Promise<Categoria> {
    return this.categoriaService.update(id, categoria);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.categoriaService.delete(id);
  }
}
