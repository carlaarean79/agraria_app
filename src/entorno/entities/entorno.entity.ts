import { Producto } from "src/producto/entities/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('entorno')
export class Entorno {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @OneToMany(()=> Producto, productos=> productos.entorno)
    productos:Producto[];

    constructor(name:string){
        this.name=name
    }

}
