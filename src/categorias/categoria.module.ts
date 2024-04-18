import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categorias } from "./entities/categoria.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Categorias])],
  providers: [],
  controllers: [],
  exports: [TypeOrmModule],
})
export class CategoriasModule {}
