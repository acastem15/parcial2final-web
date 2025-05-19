import { ActividadEntity } from '../../actividad/actividad.entity/actividad.entity';
import { EstudianteEntity } from '../../estudiante/estudiante.entity/estudiante.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class ReseñaEntity {
    @PrimaryColumn({ type: 'bigint', primary: true, generated: 'increment' })
     id: string;


    @Column()
    comentario:string;

    @Column()
    calificacion:number;

    @Column()
    fecha:string;

    @ManyToOne(() => EstudianteEntity, estudiante => estudiante.reseñas,{ nullable: true })
    estudiante: EstudianteEntity;

    @ManyToOne(() => ActividadEntity, actividad => actividad.reseñas,{ nullable: true })
    actividad: ActividadEntity;

    





}
