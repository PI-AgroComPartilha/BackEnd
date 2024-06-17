import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CategoriasCreateDto } from "../dto/categorias.create.dto";
import { CategoriaUpdateDto } from "../dto/categorias.update.dto";

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: { produtos: true },
    });
  }

  async findById(id: number): Promise<Categoria> {
    let categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: { produtos: true },
    });
    if (!categoria)
      throw new HttpException(
        "Categoria não foi encontrada!",
        HttpStatus.NOT_FOUND
      );
    return categoria;
  }

  async findByNome(nome: string): Promise<Categoria[]> {
    let categoria = await this.categoriaRepository.find({
      where: { nome: ILike(`%${nome}`) },
      relations: { produtos: true },
    });

    if (!categoria.length)
      throw new HttpException(
        "Categoria não foi encontrada!",
        HttpStatus.NOT_FOUND
      );
    return categoria;
  }

  async create(categoria: CategoriasCreateDto): Promise<Categoria> {
    const findByName = await this.categoriaRepository.findOne({
      where: { nome: ILike(`%${categoria.nome}%`) },
    });

    if (findByName)
      throw new HttpException(
        `Categoria com o nome ${categoria.nome} ja existente`,
        HttpStatus.CONFLICT
      );

    return await this.categoriaRepository.save(categoria);
  }

  async update(id: number, categoria: CategoriaUpdateDto): Promise<Categoria> {
    await this.findById(categoria.id);

    const findByName = await this.categoriaRepository.findOne({
      where: { nome: ILike(`%${categoria.nome}%`) },
    });

    if (findByName)
      throw new HttpException("Categoria ja existente", HttpStatus.CONFLICT);

    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.categoriaRepository.delete(id);
  }
}
