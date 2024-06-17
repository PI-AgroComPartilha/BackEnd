import { Transform, TransformFnParams } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsEmpty, IsNumber, IsOptional, Length } from "class-validator";
import { Categoria } from "../../categorias/entities/categoria.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { ApiProperty, OmitType } from "@nestjs/swagger";

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
  @Column({ default: "" })
  @IsOptional()
  @IsEmpty()
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
  @Column({ type: "int", default: 1 })
  @IsOptional()
  @IsEmpty()
  quantidade: number;

  /* @Column({type: 'int', nullable:true, default: 0 })
    curtidas: number; */
  @ApiProperty({ type: () => Categoria })
  @ManyToOne(() => Categoria, (categorias) => categorias.produtos, {
    onDelete: "CASCADE",
  })
  categorias: Categoria;

  //Omit password in the type
  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuarios) => usuarios.produtos, {
    onDelete: "CASCADE",
  })
  usuarios: Usuario;
}
