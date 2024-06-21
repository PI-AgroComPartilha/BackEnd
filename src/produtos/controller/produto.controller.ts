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
  Request,
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
    return this.produtoService.findAll();
  }

  @ApiResponse({
    type: Produto,
    description: "Retorna um produto pelo ID",
  })
  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  findById(@Param("id", ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @ApiResponse({
    type: [Produto],
    description: "Retorna produtos pelo nome",
  })
  @Get("/nome/:nome")
  @HttpCode(HttpStatus.OK)
  findByNome(@Param("nome") nome: string): Promise<Produto[]> {
    return this.produtoService.findByNome(nome);
  }

  @ApiResponse({
    type: [Produto],
    description: "Retorna pela descrição",
  })
  @Get("descricao/:descricao")
  @HttpCode(HttpStatus.OK)
  async findByDescricao(
    @Param("descricao") descricao: string
  ): Promise<Produto[]> {
    return this.produtoService.findByDescricao(descricao);
  }

  @ApiResponse({
    type: Produto,
    description: "Criar novo Produto",
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: ProdutoCreateDTO, @Request() req): Promise<Produto> {
    return this.produtoService.create({
      ...produto,
      usuario: { id: req.user.userId },
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put("/:id")
  @HttpCode(HttpStatus.OK)
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() produto: ProdutoUpdateDTO,
    @Request() req
  ): Promise<Produto> {
    return this.produtoService.update(id, produto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param("id", ParseIntPipe) produtoId: number,
    @Request() req
  ): Promise<DeleteResult> {
    return this.produtoService.Delete(produtoId, req.user.userId);
  }
}
