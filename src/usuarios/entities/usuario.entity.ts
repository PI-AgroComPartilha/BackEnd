import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length, IsEmail,IsUrl } from "class-validator";
import { Produto } from "src/produtos/entities/produto.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_usuarios'})
export class Usuario{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, length: 255})
  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  nome: string;

  @Column({nullable: false, length: 255, unique: true})
  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsEmail()
  usuario: string;  
  
  @Column({nullable: false,length: 255})
  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  senha: string;

  @Column({nullable: false,length: 128})
  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  tipo: string;

  @Column()
  @IsUrl()
  foto: string;

  @OneToMany(() => Produto, (produtos) => produtos.usuarios)
  produtos: Produto[];
}