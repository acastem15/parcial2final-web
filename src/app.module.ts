import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ReseñaModule } from './reseña/reseña.module';
import { ActividadModule } from './actividad/actividad.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [EstudianteModule, ReseñaModule, ActividadModule,
     TypeOrmModule.forRoot({
     type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: '1234',
     database: 'parcial2',
     entities: [EstudianteModule, ReseñaModule, ActividadModule],
     dropSchema: true,
     synchronize: true,

   }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
