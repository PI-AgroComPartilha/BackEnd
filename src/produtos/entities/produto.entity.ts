import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categorias/entities/categoria.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_produtos" })
export class Produto {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nome: string;

  @ApiProperty()
  @Column({ default: "" })
  descricao: string;

  @ApiProperty()
  @Column({
    default:
      "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg",
  })
  foto: string;

  @ApiProperty()
  @Column({ type: "decimal", precision: 8, scale: 2 })
  preco: number;

  @ApiProperty()
  @Column({ type: "int", default: 0 })
  quantidade: number;

  @ApiProperty({ type: () => Categoria })
  @ManyToOne(() => Categoria, (categorias) => categorias.produtos, {
    onDelete: "CASCADE",
    nullable: false,
  })
  categoria: Categoria;

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuarios) => usuarios.produtos, {
    onDelete: "CASCADE",
    nullable: false,
  })
  usuario: Usuario;
}
