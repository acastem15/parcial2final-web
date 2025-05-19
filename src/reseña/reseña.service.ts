import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { ReseñaEntity } from './reseña.entity/reseña.entity';
import { Repository } from 'typeorm';
import { ActividadEntity } from '../actividad/actividad.entity/actividad.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity/estudiante.entity';

@Injectable()
export class ReseñaService {

    constructor(
    @InjectRepository(ReseñaEntity)
    private readonly reseñaRepository: Repository<ReseñaEntity>,

    @InjectRepository(ActividadEntity)
           private readonly actividadRepository: Repository<ActividadEntity>,
           
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,
){}
    
    async agregarReseña(reseña: ReseñaEntity): Promise<ReseñaEntity> {

        
        const actividad: ActividadEntity | null = await this.actividadRepository.findOne({where: {id:reseña.actividad.id}, relations: ["inscritos","reseñas"] } );
        if (!actividad)
            throw new BusinessLogicException("No hay actividad con ese id", BusinessError.NOT_FOUND);
        if (actividad.estado!=2)
            throw new BusinessLogicException("La actividad no ha sido completada", BusinessError.PRECONDITION_FAILED);

        const estudiante: EstudianteEntity | undefined = await actividad.inscritos.find(est => est.id === reseña.estudiante.id);

        if (!estudiante)
            throw new BusinessLogicException("El estudiante no estaba inscrito ", BusinessError.PRECONDITION_FAILED);


        return await this.reseñaRepository.save(reseña);
              
    }

     async findReseñaById(id: string): Promise<ReseñaEntity> {
       const reseña: ReseñaEntity | null = await this.reseñaRepository.findOne({where: {id}, relations: ["actiidad", "estudiante"] } );

       if (!reseña)
         throw new BusinessLogicException("La reseña con ese id no fue encontrado", BusinessError.NOT_FOUND);
  
       return reseña;
   }



}
