import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";
import { DeleteResult } from "typeorm";
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
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProdutoCreateDTO } from "../dto/produto.create.dto";
import ProdutoUpdateDTO from "../dto/produto.update.dto";

@ApiTags("Produto")
@Controller("/produtos")
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @ApiResponse({
    type: [Produto],
    description: "Retorna todos os produtos",
  })
  @Get()
  async findAll(): Promise<Produto[]> {
    return this.produtoService.FindAll();
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  findById(@Param("id", ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get("/nome/:nome")
  @HttpCode(HttpStatus.OK)
  findByNome(@Param("nome") nome: string): Promise<Produto[]> {
    return this.produtoService.findByNome(nome);
  }

  @Get("descricao/:descricao")
  @HttpCode(HttpStatus.OK)
  async findByDescricao(
    @Param("descricao") descricao: string
  ): Promise<Produto[]> {
    return this.produtoService.findByDescricao(descricao);
  }

  /*  @ApiResponse({
    type: ,
    description: "Criar novo Produto",
  }) */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() Produto: ProdutoCreateDTO): Promise<Produto> {
    return this.produtoService.create(Produto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put("/:id")
  @HttpCode(HttpStatus.OK)
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() produto: ProdutoUpdateDTO
  ): Promise<Produto> {
    return this.produtoService.update(id, produto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.produtoService.Delete(id);
  }
}
