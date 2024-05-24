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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Produto")
@UseGuards(JwtAuthGuard)
@Controller("/produtos")
@ApiBearerAuth()
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

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

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() Produto: Produto): Promise<Produto> {
    return this.produtoService.create(Produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() Produto: Produto): Promise<Produto> {
    return this.produtoService.update(Produto);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.OK)
  delete(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.produtoService.Delete(id);
  }
}
