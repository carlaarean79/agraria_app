import { IsString } from "class-validator"
import { Categoria } from "src/categoria/entities/categoria.entity"
import { Entorno } from "src/entorno/entities/entorno.entity"

export class CreateProductoDto {
    @IsString()
    name:string

    @IsString()
    description:string

    @IsString()
    img:string

    @IsString()
    price:number

    categoria:Categoria;

    entorno:Entorno;
}
