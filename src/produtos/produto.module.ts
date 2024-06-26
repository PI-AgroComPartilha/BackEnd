import { Module } from "@nestjs/common";
import { ProdutoService } from "./services/produto.service";
import { ProdutoController } from "./controller/produto.controller";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { Produto } from "./entities/produto.entity";
import { CategoriasModule } from "src/categorias/categoria.module";
import { UsuarioModule } from "../usuarios/usuarios.module";
@Module({
  imports: [
    TypeOrmModule.forFeature([Produto]),
    UsuarioModule,
    CategoriasModule,
  ],
  providers: [ProdutoService],
  controllers: [ProdutoController],
  exports: [],
})
export class ProdutoModule {}
