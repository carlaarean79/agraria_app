import { Pedido } from "src/pedido/entities/pedido.entity";
import { Producto } from "src/producto/entities/producto.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('pedido-producto')
export class PedidoProducto {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    cantidad:number;

    @ManyToOne(()=> Producto, produc=>produc.pedidoProducto)
    @JoinColumn({name:"idProducto"})
    producto:Producto;

    @ManyToMany(()=> Pedido, pedido=>pedido.user)
    @JoinColumn({name:"idPedido"})
    pedido:Pedido;

    constructor(cantidad:number){
        this.cantidad=cantidad
    }
}
