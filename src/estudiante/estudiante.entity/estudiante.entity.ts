import { ActividadEntity } from '../../actividad/actividad.entity/actividad.entity';
import { ReseñaEntity } from '../../reseña/reseña.entity/reseña.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
@Entity()
export class EstudianteEntity {

    @PrimaryColumn({ type: 'bigint', primary: true, generated: 'increment' })
    id: string;

    @Column()
    numeroCedula:number;

    @Column()
    nombre:string;
    
    @Column() 
    correo:string;

    @Column()
    programa:string;

    @Column()
    semestre:number;

    @OneToMany(() => ReseñaEntity, reseña => reseña.estudiante,{ cascade: true })
    reseñas: ReseñaEntity[];

    @ManyToMany(() => ActividadEntity, actividad => actividad.inscritos,{ cascade: true })
    @JoinTable()
    actividades: ActividadEntity[];
    
}
