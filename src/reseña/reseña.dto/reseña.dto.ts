import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class ReseñaDto {

    @IsString()
    @IsNotEmpty()
    readonly comentario: string;

    @IsNumber()
    @IsNotEmpty()
    readonly califcacion: number;


    @IsString()
    @IsNotEmpty()
    readonly fecha: string;



}
