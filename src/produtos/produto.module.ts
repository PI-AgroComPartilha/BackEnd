import { CategoriasModule } from './../categorias/categoria.module';
import {Module} from "@nestjs/common";
import { ProdutoService } from "./services/produto.service";
import { ProdutoController } from "./controller/produto.controller";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { Produto } from "./entities/produto.entity";
import { CategoriaService } from '../categorias/services/categoria.service';

@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriasModule],
    providers: [ProdutoService, CategoriaService],
    controllers: [ProdutoController],
    exports: [TypeOrmModule]
})
export class ProdutoModule { }

