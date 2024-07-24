import { Pedido } from "src/pedido/entities/pedido.entity";
import { Producto } from "src/producto/entities/producto.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('pedidoproducto')
export class PedidoProducto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cantidad: number;

    @ManyToOne(() => Producto, producto => producto.pedidoProductos)
    @JoinColumn({ name: "idProducto" })
    producto: Producto;

    @ManyToOne(() => Pedido, pedido => pedido.pedidosProducto)
    @JoinColumn({ name: "idPedido" })
    pedido: Pedido;

    constructor(cantidad: number, producto: Producto, pedido: Pedido) {
        this.cantidad = cantidad;
        this.producto = producto;
        this.pedido = pedido;
    }
}
