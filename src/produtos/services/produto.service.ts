import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { UsuarioService } from "../../usuarios/services/usuarios.services";
import { ProdutoCreateDTO } from "../dto/produto.create.dto";
import { CategoriaService } from "../../categorias/services/categoria.service";
import ProdutoUpdateDTO from "../dto/produto.update.dto";

const relations = {
  relations: { usuario: true, categoria: true },
  select: {
    usuario: {
      id: true,
      nome: true,
      email: true,
      tipo: true,
      foto: true,
    },
  },
};

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    private readonly usuarioService: UsuarioService,
    private readonly categoriaService: CategoriaService
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find(relations);
  }

  async findById(id: number): Promise<Produto> {
    let produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      ...relations,
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
      ...relations,
    });
  }

  async findByDescricao(descricao: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      ...relations,
    });
  }

  /* TODO: Maybe is nice check if the user already have some product with the same name */
  async create(produto: ProdutoCreateDTO): Promise<Produto> {
    await this.usuarioService.findById(produto.usuario.id);
    await this.categoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  async update(
    id: number,
    produto: ProdutoUpdateDTO,
    userId: number
  ): Promise<Produto> {
    const buscaProduto: Produto = await this.findById(id);
    if (!buscaProduto || !id)
      throw new HttpException(
        "O Produto não foi encontrado!",
        HttpStatus.NOT_FOUND
      );

    if (buscaProduto.usuario.id !== userId)
      throw new HttpException(
        "O Usuário não tem permissão para editar o Produto!",
        HttpStatus.UNAUTHORIZED
      );

    if (produto.categoria && buscaProduto.categoria.id !== produto.categoria.id)
      await this.categoriaService.findById(produto.categoria.id);

    if (produto.usuario && buscaProduto.usuario.id !== produto.usuario.id)
      await this.usuarioService.findById(produto.usuario.id);

    return await this.produtoRepository.save({ ...buscaProduto, ...produto });
  }

  /* TODO: It's a good ideia check if the user is the same of the product, to not other user delete product from other */
  async Delete(produtoId: number, userId: number): Promise<DeleteResult> {
    const buscaProduto: Produto = await this.findById(produtoId);

    if (!buscaProduto)
      throw new HttpException(
        "O Produto não foi encontrado!",
        HttpStatus.NOT_FOUND
      );

    if (buscaProduto.usuario.id !== userId)
      throw new HttpException(
        "O Usuário não tem permissão para deletar o Produto!",
        HttpStatus.UNAUTHORIZED
      );

    return await this.produtoRepository.delete(produtoId);
  }
}
