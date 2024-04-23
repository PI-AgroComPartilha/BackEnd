import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produtos/entities/produto.entity";

@Entity({ name: "tb_categorias" })
export class Categorias {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Length(4, 50)
  @Column({ nullable: false })
  tipo: string;

  @OneToMany(() => Produto, (produtos) => produtos.categorias,{})
  produtos: Produto[];
}