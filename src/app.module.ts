import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriasModule } from "./categorias/categoria.module";
import { ProdutoModule } from "./produtos/produto.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { UsuarioModule } from "./usuarios/usuarios.module";
import { ProdService } from "./auth/data/services/prod.service";

import { DevService } from "./auth/data/services/dev.service";
import { AppController } from "./app.controller";
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: DevService,
      imports: [ConfigModule],
    }),
    /* TODO: Try fix CategoriasModule fist */
    CategoriasModule,
    ProdutoModule,
    UsuarioModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
