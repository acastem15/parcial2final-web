import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadModule } from '../../actividad/actividad.module';
import { EstudianteModule } from '../../estudiante/estudiante.module';
import { ReseñaModule } from '../../reseña/reseña.module';


export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [EstudianteModule, ReseñaModule, ActividadModule],
   synchronize: true,
 }),
 TypeOrmModule.forFeature([EstudianteModule, ReseñaModule, ActividadModule]),
];