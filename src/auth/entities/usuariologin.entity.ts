import { ApiProperty } from "@nestjs/swagger";

export class UsuarioLogin {
  @ApiProperty({ example: "root@root.com" })
  public email: string;

  @ApiProperty({ example: "rootroot" })
  public senha: string;
}
