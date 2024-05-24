import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { UsuarioService } from "../../usuarios/services/usuarios.services";

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>
  ) {}

  async FindAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: { usuarios: true, categorias: true },
    });
  }

  async findById(id: number): Promise<Produto> {
    let produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: { usuarios: true, categorias: true },
    });

    if (!produto)
      throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND);

    return produto;
  }

  async findByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: { usuarios: true, categorias: true },
    });
  }

  async findByDescricao(descricao: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
    });
  }

  async create(produto: Produto): Promise<Produto> {
    if (!produto) {
      throw new HttpException(
        "Produto não pode ser vazio",
        HttpStatus.BAD_REQUEST
      );
    }

    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    let buscaProduto: Produto = await this.findById(produto.id);

    if (!buscaProduto || !produto.id)
      throw new HttpException(
        "O Produto não foi encontrado!",
        HttpStatus.NOT_FOUND
      );

    return await this.produtoRepository.save(produto);
  }

  async Delete(id: number): Promise<DeleteResult> {
    let buscaProduto: Produto = await this.findById(id);

    if (!buscaProduto)
      throw new HttpException(
        "O Produto não foi encontrado!",
        HttpStatus.NOT_FOUND
      );

    return await this.produtoRepository.delete(id);
  }
}
