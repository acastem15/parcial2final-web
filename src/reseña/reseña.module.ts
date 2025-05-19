import { Module } from '@nestjs/common';
import { ReseñaService } from './reseña.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReseñaEntity } from './reseña.entity/reseña.entity';
import { ActividadEntity } from '../actividad/actividad.entity/actividad.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity/estudiante.entity';
import { ReseñaController } from './reseña.controller';

@Module({
  providers: [ReseñaService],
  imports: [TypeOrmModule.forFeature([ReseñaEntity,ActividadEntity,EstudianteEntity])],
  controllers: [ReseñaController],
})
export class ReseñaModule {}
