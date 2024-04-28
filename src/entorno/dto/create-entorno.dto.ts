import { IsString } from "class-validator";

export class CreateEntornoDto {
    @IsString()
    name:string
}
