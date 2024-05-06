import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriasModule } from "./categorias/categoria.module";
import { Categorias } from "./categorias/entities/categoria.entity";
import { Produto } from "./produtos/entities/produto.entity";
import { ProdutoModule } from "./produtos/produto.module";
import { Usuario } from "./usuarios/entities/usuario.entity";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { UsuarioModule } from "./usuarios/usuarios.module";
import { DevService } from "./auth/data/services/dev.service";
import { ProdService } from "./auth/data/services/prod.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    ProdutoModule,
    CategoriasModule,
    UsuarioModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
