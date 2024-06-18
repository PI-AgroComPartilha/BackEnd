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

  @Column({ nullable: false, length: 255 })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @Column({ nullable: false, length: 255, unique: true })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail()
  @ApiProperty({ example: "email@email.com.br" })
  usuario: string;

  @Column({ nullable: false, length: 255 })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @ApiProperty()
  senha: string;

  @Column({ nullable: false, length: 128 })
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsIn(["vendedor", "cliente", "admin"])
  @ApiProperty({ examples: ["cliente", "vendedor", "admin"] })
  tipo: string;

  @Column()
  @ApiProperty()
  foto: string;

  @ApiProperty({ type: () => Produto })
  @OneToMany(() => Produto, (produto) => produto.usuario, {
    onDelete: "CASCADE",
  })
  produtos: Produto;
}
