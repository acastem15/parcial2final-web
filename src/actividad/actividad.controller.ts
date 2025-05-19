import { Body, Controller, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ActividadDto } from './actividad.dto/actividad.dto';
import { ActividadEntity } from './actividad.entity/actividad.entity';
import { plainToInstance } from 'class-transformer';

@Controller('actividades')
@UseInterceptors(BusinessErrorsInterceptor)
export class ActividadController {
    constructor(private readonly actividadService: ActividadService) {}

    @Post()
    async create(@Body() actividadDto: ActividadDto) {
        const actividad: ActividadEntity = plainToInstance(ActividadEntity, actividadDto);
        return await this.actividadService.create(actividad);
 }

    @Put(':actividadID/:estado')
    async cambiarEstado(@Param('actividadID') actividadID: string, @Param('estado') estado: number) {
        
        return await this.actividadService.cambiarEstado(actividadID,estado);
 }

  @Get(':fecha')
  async findAllActividadesByDate(@Param('fecha') fecha: string) {
    return await this.actividadService.findAllActividadesByDate(fecha);
  }
}
