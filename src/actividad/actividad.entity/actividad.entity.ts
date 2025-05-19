import { EstudianteEntity } from '../../estudiante/estudiante.entity/estudiante.entity';
import { ReseñaEntity } from '../../reseña/reseña.entity/reseña.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ActividadEntity {

    @PrimaryColumn({ type: 'bigint', primary: true, generated: 'increment' })
  id: string;

    @Column()
    titulo:string;

    @Column()
    fecha:string;

    @Column()
    cupoMaximo:number;
    @Column()
    estado:number;

    @OneToMany(() => ReseñaEntity, reseña => reseña.actividad)
       reseñas: ReseñaEntity[];

    @ManyToMany(() => EstudianteEntity, estudiante => estudiante.actividades,{ cascade: true })
    inscritos: EstudianteEntity[];
    


       
}
