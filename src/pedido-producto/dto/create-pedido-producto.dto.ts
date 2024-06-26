import { IsNumber } from "class-validator";
import { Pedido } from "src/pedido/entities/pedido.entity";
import { Producto } from "src/producto/entities/producto.entity";

export class PedidoProductoDto {
    @IsNumber()
    cantidad:number;

    producto:Producto;

    pedido:Pedido;
}
