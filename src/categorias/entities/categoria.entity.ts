import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tb_categorias" })
export class Categorias {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Length(4, 50)
  @Column({ nullable: false })
  tipo: string;
}
