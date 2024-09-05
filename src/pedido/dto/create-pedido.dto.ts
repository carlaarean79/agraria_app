import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { PedidoProductoDto } from 'src/pedido-producto/dto/create-pedido-producto.dto';

export class CreatePedidoDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)  // Usando 'class-transformer' para transformar la fecha
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  detalle: string;

  @IsNotEmpty()
  @Type(()=> User)
  user: User;
  
  @IsNotEmpty()
  @Type(() => PedidoProductoDto)
  pedidoProducto: PedidoProductoDto[];
}
