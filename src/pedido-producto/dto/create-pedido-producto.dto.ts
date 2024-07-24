import { IsNumber, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { Pedido } from "src/pedido/entities/pedido.entity";
import { Producto } from "src/producto/entities/producto.entity";

export class PedidoProductoDto {
    @IsNumber()
    @IsNotEmpty()
    cantidad: number;

    @Type(() => Producto)
    @IsNotEmpty()
    producto: Producto;

    @Type(() => Pedido)
    @IsNotEmpty()
    pedido: Pedido;
}
