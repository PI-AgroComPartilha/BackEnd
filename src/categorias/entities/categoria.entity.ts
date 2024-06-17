import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produtos/entities/produto.entity";
import { ApiProperty } from "@nestjs/swagger";

class ProdutoDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  nome: string;
  @ApiProperty()
  descricao: string;
  @ApiProperty()
  foto: string;
  @ApiProperty()
  quantidade: number;
}

@Entity({ name: "tb_categorias" })
export class Categoria {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column({ nullable: false, length: 255 })
  nome: string;

  @ApiProperty({ type: () => [ProdutoDTO] })
  @OneToMany(() => Produto, (produtos) => produtos.categorias)
  produtos: Produto[];
}
