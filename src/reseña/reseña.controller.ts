import { Body, Controller, Get, Param, Put, UseInterceptors } from '@nestjs/common';
import { ReseñaService } from './reseña.service';
import { ReseñaDto } from './reseña.dto/reseña.dto';
import { plainToInstance } from 'class-transformer';
import { ReseñaEntity } from './reseña.entity/reseña.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('reseñas')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReseñaController {

    constructor(private readonly reseñaService: ReseñaService) {}

    @Get(':id')
    async findEstudianteById(@Param('id') id: string) {
        return await this.reseñaService.findReseñaById(id); 
    }

    @Put()
    async agregarReseña(@Body() reseñaDto: ReseñaDto) {
        const reseña: ReseñaEntity = plainToInstance(ReseñaEntity, reseñaDto);
        
        return await this.reseñaService.agregarReseña(reseña)
    }
    
}
