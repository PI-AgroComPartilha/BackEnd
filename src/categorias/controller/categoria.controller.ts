import {Body,Controller,Delete,Get,HttpCode,HttpException,HttpStatus,Param,ParseIntPipe,Post,Put, UseGuards,} from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';
import { Categorias } from '../entities/categoria.entity';
import { DeleteResult } from "typeorm";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("/categorias")
export class CategoriaController {
  
  constructor (private readonly categoriaService: CategoriaService){}
    
   @Get()
   async findAll(): Promise<Categorias[]>{
        return this.categoriaService.findAll()
   } 

   @Get('/:id')
   @HttpCode(HttpStatus.OK)
   async findById(@Param('id', ParseIntPipe)id: number): Promise<Categorias>{
        return this.categoriaService.findById(id);
    }

    @Get('tipo/:tipo')
    @HttpCode(HttpStatus.OK)
    async findByTipo(@Param('tipo') tipo: string): Promise<Categorias[]>{
      return this.categoriaService.findByTipo(tipo);
    }
    
   @Post()
   @HttpCode(HttpStatus.OK)
   create(@Body() categoria: Categorias): Promise<Categorias>{
        return this.categoriaService.create(categoria);
   }
   
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() categoria: Categorias): Promise<Categorias>{
        return this.categoriaService.update(categoria)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult>{
        return this.categoriaService.delete(id);
    }
}