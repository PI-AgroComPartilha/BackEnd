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

  async validateUser(username: string, password: string): Promise<any> {
    const buscaUsuario = await this.usuarioService.findByUsuario(username);

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

  async login(usuarioLogin: UsuarioLogin) {
    const payload = { sub: usuarioLogin.usuario };
    const buscaUsuario = await this.usuarioService.findByUsuario(
      usuarioLogin.usuario
    );
    if (!buscaUsuario)
      throw new HttpException("Usuário não encontrado!", HttpStatus.NOT_FOUND);

    const user = await this.validateUser(
      usuarioLogin.usuario,
      usuarioLogin.senha
    );

    return {
      id: user.id,
      nome: user.nome,
      usuario: user.usuario,
      senha: "",
      foto: user.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
