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

    @Column({ length: 250, nullable: true })
    descripcion: string;

    @Column({ type: 'varchar' })
    imagen: string;

    @Column()
    price: number;

    @Column({ nullable: true })
    detalle: string;

    @ManyToOne(() => Categoria, categoria => categoria.productos)
    @JoinColumn({ name: "categoria_id" })
    categoria: Categoria;

    @ManyToOne(() => Entorno, entorno => entorno.productos)
    @JoinColumn({ name: "entorno_id" })
    entorno: Entorno;

    @OneToMany(() => PedidoProducto, pedidoProducto => pedidoProducto.producto)
    pedidoProducto: PedidoProducto[];

    constructor(name: string, descripcion: string, imagen: string, price: number, detalle: string, categoria: Categoria, entorno: Entorno) {
        this.name = name;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.price = price;
        this.detalle = detalle;
        this.categoria = categoria;
        this.entorno = entorno;
    }
}
