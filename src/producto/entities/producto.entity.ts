import { Categoria } from "src/categoria/entities/categoria.entity";
import { Entorno } from "src/entorno/entities/entorno.entity";
import { PedidoProducto } from "src/pedido-producto/entities/pedido-producto.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('producto')
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 40 })
    name: string;

    @Column({ length: 250 })
    descripcion: string;

    @Column({ type: 'varchar' })
    imagen: string;

    @Column()
    price: number;

    @ManyToOne(() => Categoria, categoria => categoria.productos)
    @JoinColumn({ name: "categoria_id" })
    categoria: Categoria;

    @ManyToOne(() => Entorno, entorno => entorno.productos)
    @JoinColumn({ name: "entorno_id" })
    entorno: Entorno;

    @OneToMany(() => PedidoProducto, pedProd => pedProd.producto)
    pedidoProductos: PedidoProducto[];

    constructor(name: string, descripcion: string, imagen: string, price: number, categoria: Categoria, entorno: Entorno) {
        this.name = name;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.price = price;
        this.categoria = categoria;
        this.entorno = entorno;
    }
}
