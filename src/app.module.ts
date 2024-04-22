import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriasModule } from "./categorias/categoria.module";
import { Categorias } from "./categorias/entities/categoria.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "db_agrocompartilha",
      entities: [Categorias],
      synchronize: true,
    }),
    CategoriasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
