import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EstudianteDto {


    @IsNumber()
    @IsNotEmpty()
    readonly numeroCedula: number;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly correo: string;

    @IsString()
    @IsNotEmpty()
    readonly programa: string;

    @IsNumber()
    @IsNotEmpty()
    readonly semestre: number;


}
