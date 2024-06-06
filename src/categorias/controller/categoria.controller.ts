import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards, } from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';
import { Categorias } from '../entities/categoria.entity';
import { DeleteResult } from "typeorm";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Categoria')
@Controller("/categorias")
export class CategoriaController {

  constructor(private readonly categoriaService: CategoriaService) { }

  @Get()
  async findAll(): Promise<Categorias[]> {
    return this.categoriaService.findAll()
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Categorias> {
    return this.categoriaService.findById(id);
  }

  @Get('tipo/:tipo')
  @HttpCode(HttpStatus.OK)
  async findByTipo(@Param('tipo') tipo: string): Promise<Categorias[]> {
    return this.categoriaService.findByTipo(tipo);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() categoria: Categorias): Promise<Categorias> {
    return this.categoriaService.create(categoria);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() categoria: Categorias): Promise<Categorias> {
    return this.categoriaService.update(categoria)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.categoriaService.delete(id);
  }
}