import { Pedido } from "src/pedido/entities/pedido.entity";
import { Producto } from "src/producto/entities/producto.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('pedidoproducto')
export class PedidoProducto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cantidad: number;

    @ManyToOne(() => Producto, producto => producto.pedidosProductos)
    producto: Producto;

    @ManyToOne(() => Pedido, pedido => pedido.pedidProducto)
    @JoinTable()
    pedidos: Pedido;

    constructor(cantidad: number, producto: Producto, pedido: Pedido) {
        this.cantidad = cantidad;
        this.producto = producto;
        this.pedidos = pedido;
    }
}
