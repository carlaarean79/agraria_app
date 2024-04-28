import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;
    
    @IsNotEmpty()
    @IsNumber()
    telephone:number;

    @IsNotEmpty()
    @IsEmail()
    email:string
}
