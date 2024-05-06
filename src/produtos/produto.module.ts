import {Module} from "@nestjs/common";
import { ProdutoService } from "./services/produto.service";
import { ProdutoController } from "./controller/produto.controller";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { Produto } from "./entities/produto.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Produto])],
    providers: [ProdutoService],
    controllers: [ProdutoController],
    exports: [TypeOrmModule]
})
export class ProdutoModule { }

