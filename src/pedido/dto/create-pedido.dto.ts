import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

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
}
