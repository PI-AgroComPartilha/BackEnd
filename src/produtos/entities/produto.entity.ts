import { Transform, TransformFnParams } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Length } from "class-validator";
import { Categorias } from "../../categorias/entities/categoria.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";

// relação muitos produtos para 1 usuario

@Entity({name: "tb_produtos"})
export class Produto {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @Length(3,255)
    @Transform(({value}: TransformFnParams) => value?.trim())
    nome:string;

    @Column()
    @Length(9,255)
    @Transform(({value}: TransformFnParams) => value?.trim())
    descricao:string;

    @Column()
    @Length(25,500)
    @Transform(({value}: TransformFnParams) => value?.trim())
    foto:string;

    @Column({type:'decimal', precision:8, scale:2})
    preco:number;

    @Column({type:"int"})
    quantidade: number;

    @ManyToOne(() => Categorias, (categorias) => categorias.produtos,{//Relação 
        onDelete: "CASCADE"
    })
    categorias: Categorias;

    @ManyToOne(() => Usuario, (usuarios) => usuarios.produtos,{
        onDelete: "CASCADE"
    })
    usuarios: Usuario;
}
