import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../../usuarios/services/usuarios.services";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from "../bcrypt/bcrypt";
import { UsuarioLogin } from "../entities/usuariologin.entity";

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const buscaUsuario = await this.usuarioService.findByEmail(email);

    if (!buscaUsuario)
      throw new HttpException("Usuário não encontrado!", HttpStatus.NOT_FOUND);

    const matchPassword = await this.bcrypt.compararSenha(
      password,
      buscaUsuario.senha
    );

    if (buscaUsuario && matchPassword) {
      const { senha, ...resposta } = buscaUsuario;
      return resposta;
    } else {
      throw new HttpException("Senha incorreta", HttpStatus.BAD_REQUEST);
    }
  }

  async login({ email, senha }: UsuarioLogin) {
    const buscaUsuario = await this.usuarioService.findByEmail(email);
    const user = await this.validateUser(email, senha);
    const payload = { userId: buscaUsuario.id, email: buscaUsuario.email };
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      foto: user.foto,
      tipo: user.tipo,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
