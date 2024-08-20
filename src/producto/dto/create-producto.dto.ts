import { Type } from "class-transformer";
import { IsNotEmpty, isNumber, IsNumber, IsString, ValidateNested } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Entorno } from "src/entorno/entities/entorno.entity";

export class ProductoDto {
    @IsString()
    name: string;

    @IsString()
    detalle:string;
    
    @IsString()
    descripcion: string;
    
    @IsString()
    imagen: string;
    
    @IsNumber()
    price: number;
    
    @IsNumber()
    categoria: Categoria;
    @IsNumber()
    entorno: Entorno;
}
