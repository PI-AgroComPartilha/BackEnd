import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { UsuarioCreateDTO } from "../dto/usuario.create.dto";
import { UsuarioUpdateDTO } from "../dto/usuario.update.dto";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      relations: {
        produtos: true,
      },
    });
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
      relations: {
        produtos: true,
      },
    });

    if (!usuario)
      throw new HttpException(
        `Usuario com id: ${id}, não foi encontrado.`,
        HttpStatus.NOT_FOUND
      );

    return usuario;
  }

  async findByName(nome: string): Promise<Usuario[]> {
    const usuario = await this.usuarioRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });

    if (!usuario)
      throw new HttpException(
        `Usuario com nome: ${name}, não foi encontrado.`,
        HttpStatus.NOT_FOUND
      );

    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | undefined> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        email,
      },
    });

    if (!usuario)
      throw new HttpException(
        `Usuario com email: ${email}, não foi encontrado.`,
        HttpStatus.NOT_FOUND
      );

    return usuario;
  }

  async create(usuario: UsuarioCreateDTO): Promise<Usuario> {
    await this.checkExistEmail(usuario.email);
    await this.checkExistName(usuario.nome);

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    return await this.usuarioRepository.save(usuario);
  }

  async update(id: number, usuario: UsuarioUpdateDTO): Promise<Usuario> {
    /* I don't now if will check by id or by email */
    const userDB = await this.findById(id);
    console.log("passssssssshre");
    if (usuario.email) await this.checkExistEmail(usuario.email, id);
    if (usuario.nome) await this.checkExistName(usuario.nome, id);
    if (usuario.senha)
      usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

    return await this.usuarioRepository.save({
      ...userDB,
      ...usuario,
    });
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.usuarioRepository.delete(id);
  }

  private async checkExistEmail(email: string, id?: number) {
    const existEmail = await this.usuarioRepository.findOne({
      where: {
        email,
      },
    });

    if (existEmail) {
      if (id && existEmail.id === id) return;

      throw new HttpException(
        "O Email informado ja foi cadastrado.",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  private async checkExistName(nome: string, id?: number) {
    const existName = await this.usuarioRepository.findOne({
      where: {
        nome,
      },
    });

    if (existName) {
      if (id && existName.id === id) return;
      throw new HttpException(
        "O Nome informado ja foi cadastrado.",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
