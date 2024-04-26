import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriasModule } from "./categorias/categoria.module";
import { Categorias } from "./categorias/entities/categoria.entity";
import { Produto } from "./produtos/entities/produto.entity";
import { ProdutoModule } from "./produtos/produto.module";
import { Usuario } from "./usuarios/entities/usuario.entity";
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuarios/usuario.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "db_agrocompartilha",
      entities: [Categorias, Produto, Usuario],
      synchronize: true,
    }),
    CategoriasModule,
    ProdutoModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
