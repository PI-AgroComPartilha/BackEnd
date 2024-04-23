import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Categorias } from "../entities/categoria.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categorias)
        private categoriaRepository: Repository<Categorias>
    ) { }

    async findAll(): Promise<Categorias[]> {
        return await this.categoriaRepository.find()
    }

    async findById(id: number): Promise<Categorias> {
        let categoria = await this.categoriaRepository.findOne({
            where: { id }
        });
        if (!categoria)
            throw new HttpException('Categoria não foi encontrada!', HttpStatus.NOT_FOUND);
        return categoria;
    }

    async findByTipo(tipo: string): Promise<Categorias[]> {

        let categoria = await this.categoriaRepository.find({
            where: { tipo: ILike(`%${tipo}%`) }
        });

        if (!categoria.length)
            throw new HttpException('Categoria não foi encontrada!', HttpStatus.NOT_FOUND);
        return categoria
    }

    async create(categoria: Categorias): Promise<Categorias> {
        return await this.categoriaRepository.save(categoria);
    }

    async update(categoria: Categorias): Promise<Categorias> {
        let buscaCategoria: Categorias = await this.findById(categoria.id);
        if (!buscaCategoria || !categoria.id)
            throw new HttpException('Categoria não foi encontrada!', HttpStatus.NOT_FOUND)

        return await this.categoriaRepository.save(categoria);
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscaCategoria: Categorias = await this.findById(id);
        if (!buscaCategoria)
            throw new HttpException('Categoria não foi encontrada!', HttpStatus.NOT_FOUND)
        return await this.categoriaRepository.delete(id);
    }

}
