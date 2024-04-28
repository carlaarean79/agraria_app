import { Producto } from "src/producto/entities/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categoria')
export class Categoria {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    descripcion:string

    @OneToMany(()=> Producto, producto => producto.categoria)
    productos:Producto[];

    constructor(name:string,descripcion:string){
        this.name= name;
        this.descripcion=descripcion
    }
}
