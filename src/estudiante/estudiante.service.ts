import { Injectable } from '@nestjs/common';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { ActividadEntity } from '../actividad/actividad.entity/actividad.entity';


@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,
          @InjectRepository(ActividadEntity)
                   private readonly actividadRepository: Repository<ActividadEntity>,
    
    
    ){}

    async create(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!( estudiante.semestre<10 )&& !(estudiante.semestre>1)){
            throw new BusinessLogicException("The estudiante semester is not okay", BusinessError.PRECONDITION_FAILED);
        }
        if (!regexEmail.test(estudiante.correo)){
            throw new BusinessLogicException("The  student email does not match", BusinessError.PRECONDITION_FAILED);

        }
        return await this.estudianteRepository.save(estudiante);
  
      
    }
    async findEstudianteById(id: string): Promise<EstudianteEntity> {
       const estudiante: EstudianteEntity | null = await this.estudianteRepository.findOne({where: {id}, relations: ["actividades", "reseñas"] } );
       if (!estudiante)
         throw new BusinessLogicException("El estudiante con ese id no fue encontrado", BusinessError.NOT_FOUND);
  
       return estudiante;
   }
     async InscribirseActividad( estudianteID:string,actividadID:string): Promise<EstudianteEntity> {
       const actividad: ActividadEntity | null = await this.actividadRepository.findOne({where: {id:actividadID}, relations: ["inscritos", "reseñas"] } );
       if (!actividad)
         throw new BusinessLogicException("La actividad con ese id no fue encontrado", BusinessError.NOT_FOUND);

        if (actividad.estado!=0)
         throw new BusinessLogicException("La actividad no esta abierta", BusinessError.PRECONDITION_FAILED);
  
        
        
        const estudiante: EstudianteEntity | null = await this.estudianteRepository.findOne({where: {id:estudianteID}, relations: ["actividades", "reseñas"] } );

        if(!estudiante){
            throw new BusinessLogicException("El estudiante con ese id no fue encontrado", BusinessError.NOT_FOUND);

        }
        const estudianteInscrito: EstudianteEntity | undefined = await actividad.inscritos.find(est => est.id === estudianteID);

        if (estudianteInscrito)
            throw new BusinessLogicException("Estudiante previamente inscrito", BusinessError.PRECONDITION_FAILED);

        
        
        actividad.inscritos.push(estudiante)
        this.actividadRepository.save(actividad)

        estudiante.actividades.push(actividad)

        return  this.estudianteRepository.save(estudiante)
;
   }


    
}
