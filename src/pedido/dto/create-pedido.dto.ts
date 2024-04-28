import { IsNumber, IsString } from "class-validator";

export class CreatePedidoDto {
    @IsNumber()
    cantidad:number;
    
    @IsString()
    descripcion:string;

    @IsNumber()
    totalApagar:number
}
