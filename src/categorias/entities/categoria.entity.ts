import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produtos/entities/produto.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_categorias" })
export class Categoria {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column({ nullable: false, length: 255 })
  nome: string;

  @ApiProperty({ type: () => [Produto.prototype.quantidade] })
  @OneToMany(() => Produto, (produtos) => produtos.categorias)
  produtos: Produto[];
}
