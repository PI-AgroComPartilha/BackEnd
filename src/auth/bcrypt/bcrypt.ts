import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class Bcrypt {
  async criptografarSenha(senha: string): Promise<string> {
    const saltos = 12;
    return await bcrypt.hash(senha, saltos);
  }

  async compararSenha(
    senhaDigitada: string,
    senhaSecreta: string
  ): Promise<boolean> {
    return bcrypt.compareSync(senhaDigitada, senhaSecreta);
  }
}
