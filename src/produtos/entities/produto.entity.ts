import { Transform, TransformFnParams } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNumber, Length } from "class-validator";
import { Categorias } from "../../categorias/entities/categoria.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

// relação muitos produtos para 1 usuario

@Entity({ name: "tb_produtos" })
export class Produto {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  @Length(3, 255)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  nome: string;

  @ApiProperty()
  @Column()
  @Length(9, 255)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  descricao: string;

  @ApiProperty()
  @Column()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  foto: string;

  @ApiProperty()
  @Column({ type: "decimal", precision: 8, scale: 2 })
  @IsNumber()
  preco: number;

  @ApiProperty()
  @Column({ type: "int" })
  quantidade: number;

  /* @Column({type: 'int', nullable:true, default: 0 })
    curtidas: number; */
  @ApiProperty({ type: () => Categorias })
  @ManyToOne(() => Categorias, (categorias) => categorias.produtos, {
    //Relação
    onDelete: "CASCADE",
  })
  categorias: Categorias;

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuarios) => usuarios.produtos, {
    onDelete: "CASCADE",
  })
  usuarios: Usuario;
}
