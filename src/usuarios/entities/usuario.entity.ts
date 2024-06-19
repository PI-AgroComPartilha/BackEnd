import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length, IsEmail, IsUrl, IsIn } from "class-validator";
import { Produto } from "src/produtos/entities/produto.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "tb_usuarios" })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: false, length: 255, unique: true })
  nome: string;

  @ApiProperty()
  @Column({ nullable: false, length: 255, unique: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: false, length: 255 })
  senha: string;

  @Column({ nullable: false, length: 128 })
  tipo: string;

  @Column({
    default:
      "https://conflictresolutionmn.org/wp-content/uploads/2020/01/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg",
  })
  @ApiProperty()
  foto: string;

  @ApiProperty({ type: () => Produto })
  @OneToMany(() => Produto, (produto) => produto.usuario, {
    onDelete: "CASCADE",
  })
  produtos: Produto;
}
