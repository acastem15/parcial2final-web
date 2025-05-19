import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadEntity } from './actividad.entity/actividad.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ActividadService {
    constructor(
            @InjectRepository(ActividadEntity)
            private readonly actividadRepository: Repository<ActividadEntity>
        ){}

     async create(actividad: ActividadEntity): Promise<ActividadEntity> {

       if ( actividad.estado != 0){
            throw new BusinessLogicException("El estado de la actividad no se inicializó en 0 ", BusinessError.PRECONDITION_FAILED);

       }; 
    
            if (!( actividad.titulo.length<15 )){
                throw new BusinessLogicException("The Actividad title is too short", BusinessError.PRECONDITION_FAILED);
                
            }
            if (!(/^[a-zA-Z0-9]+$/.test(actividad.titulo))){
                throw new BusinessLogicException("The Actividad title has symbols", BusinessError.PRECONDITION_FAILED);

            }
           
            return await this.actividadRepository.save(actividad);
      
          
        }
        async cambiarEstado(actividadID: string, estado: number): Promise<ActividadEntity> {
            const actividad: ActividadEntity | null = await this.actividadRepository.findOne({where: {id:actividadID}, relations: ["inscritos", "reseñas"] } );
                   if (!actividad)
                     throw new BusinessLogicException("No hay actividad con ese id", BusinessError.NOT_FOUND);
              


            if ((actividad.inscritos.length == actividad.cupoMaximo*80/100)&& (actividad.inscritos.length <actividad.cupoMaximo)){
                if (estado !=1){
                    throw new BusinessLogicException("El nuevo estado de la actividad debería ser 1 (cerrado)", BusinessError.NOT_FOUND);

                }
            }
            if (actividad.inscritos.length =actividad.cupoMaximo){
                if (estado !=2){
                    throw new BusinessLogicException("El estado de la actividad debería ser 2 (Finalizada)", BusinessError.NOT_FOUND);

                }
            }

            const persistedActividad: ActividadEntity| null = await this.actividadRepository.findOne({where:{id:actividadID}, relations: ["inscritos", "reseñas"]});
            if (!persistedActividad){
              throw new BusinessLogicException("The actividad with the given id was not found", BusinessError.NOT_FOUND);
            
            }
            //Update actividad
            actividad.estado = estado;
            return await this.actividadRepository.save({...persistedActividad, ...actividad});

        }

    async findAllActividadesByDate(fecha:string): Promise<ActividadEntity[]> {
        return this.actividadRepository.find({where: {fecha:fecha}}); // Find los objetos que son tipo oferta
    }




}
