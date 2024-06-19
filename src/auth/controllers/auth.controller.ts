import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { UsuarioLogin } from "./../entities/usuariologin.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Usuario")
@Controller("/usuarios")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("/logar")
  async login(@Body() user: UsuarioLogin): Promise<any> {
    return this.authService.login(user);
  }
}
