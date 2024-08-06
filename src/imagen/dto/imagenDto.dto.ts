import { IsString } from "class-validator";

export class ImagenDto {
    @IsString()
    name:string;
    
    @IsString()
    categoria:string;
    
    @IsString()
    url: string;
}