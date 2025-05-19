import { Body, Controller, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { plainToInstance } from 'class-transformer';
import { EstudianteDto } from './estudiante.dto/estudiante.dto';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)

export class EstudianteController {

    constructor(private readonly estudianteService: EstudianteService) {}

    @Post()
    async create(@Body() estudianteDto: EstudianteDto) {
        const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudianteDto);
        return await this.estudianteService.create(estudiante);
    }
    @Get(':id')
    async findEstudianteById(@Param('id') id: string) {
        return await this.estudianteService.findEstudianteById(id); 
    }
    
    @Put(':estudianteID/actividades/:actividadID')
    async InscribirseActividad(@Param('estudianteID') estudianteID: string,@Param('acividadID') actividadID: string ) {
        
        return await this.estudianteService.InscribirseActividad(estudianteID,actividadID)
    }
    
      
    
}
