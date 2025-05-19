import { Test, TestingModule } from '@nestjs/testing';
import { ReseñaService } from './reseña.service';
import { ReseñaEntity } from './reseña.entity/reseña.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteService } from '../estudiante/estudiante.service';
import { ActividadService } from '../actividad/actividad.service';
import { EstudianteEntity } from '../estudiante/estudiante.entity/estudiante.entity';
import { ActividadEntity } from '../actividad/actividad.entity/actividad.entity';
import { faker } from '@faker-js/faker';

describe('ReseñaService', () => {
  let serviceReseña: ReseñaService;
 let repositoryReseña: Repository<ReseñaEntity>;
  let serviceEstudiante: EstudianteService;
  let repositoryEstudiante: Repository<EstudianteEntity>;
  let serviceActividad: ActividadService;
   let repositoryActividad: Repository<ActividadEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [ReseñaService],
   }).compile();

   serviceReseña = module.get<ReseñaService>(ReseñaService);
   repositoryReseña = module.get<Repository<ReseñaEntity>>(getRepositoryToken(ReseñaEntity));
    serviceEstudiante = module.get<EstudianteService>(EstudianteService);
      repositoryEstudiante = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
       serviceActividad = module.get<ActividadService>(ActividadService);
       repositoryActividad = module.get<Repository<ActividadEntity>>(getRepositoryToken(ActividadEntity));
 });
  
 it('should be defined', () => {
   expect(serviceReseña).toBeDefined();
 });

 it('Agregar reseña okey ', async () => {

  const idKnown = faker.string.uuid()
  console.log(idKnown)

  const actividad: ActividadEntity = {
     id: faker.string.uuid(),
     titulo: faker.lorem.sentence(20),
     fecha: faker.word.noun(),
     cupoMaximo: faker.number.int({ min: 5, max: 50 }),
      estado: 0,
     inscritos: [],
     reseñas: []
   }

   const estudiante: EstudianteEntity = {
     id:  faker.string.uuid() ,
     nombre: faker.word.noun(),
     numeroCedula: faker.number.int({ min: 100000, max: 100000 }),
     correo: faker.internet.email(),
     programa: faker.word.noun(),
     semestre: faker.number.int({ min: 1, max: 10 }),
     actividades: [],
     reseñas: []
   }
    const newEstudiante: EstudianteEntity = await serviceEstudiante.create(estudiante)
    const newActividad: ActividadEntity = await serviceActividad.create(actividad)
    serviceEstudiante.InscribirseActividad(newEstudiante.id,actividad.id)


   const reseña: ReseñaEntity = {
     id:  idKnown ,
     comentario: faker.lorem.paragraph(),
     calificacion: faker.number.int({ min: 0, max: 10 }),
     fecha: faker.word.noun(10),
   
     estudiante: estudiante,
     actividad: actividad,
   }

  
   expect(serviceReseña.agregarReseña(reseña)).not.toBeNull();
   expect((await serviceReseña.agregarReseña(reseña)).estudiante.id).toEqual(estudiante.id)
   
 });

  it('Agregar reseña NOT okey - Falta inscripcion', async () => {

  const idKnown = faker.string.uuid()
  console.log(idKnown)

  const actividad: ActividadEntity = {
     id: faker.string.uuid(),
     titulo: faker.lorem.sentence(20),
     fecha: faker.word.noun(),
     cupoMaximo: faker.number.int({ min: 5, max: 50 }),
      estado: 0,
     inscritos: [],
     reseñas: []
   }

   const estudiante: EstudianteEntity = {
     id:  faker.string.uuid() ,
     nombre: faker.word.noun(),
     numeroCedula: faker.number.int({ min: 100000, max: 100000 }),
     correo: faker.internet.email(),
     programa: faker.word.noun(),
     semestre: faker.number.int({ min: 1, max: 10 }),
     actividades: [],
     reseñas: []
   }
    const newEstudiante: EstudianteEntity = await serviceEstudiante.create(estudiante)
    const newActividad: ActividadEntity = await serviceActividad.create(actividad)
    //serviceEstudiante.InscribirseActividad(newEstudiante.id,actividad.id)


   const reseña: ReseñaEntity = {
     id:  idKnown ,
     comentario: faker.lorem.paragraph(),
     calificacion: faker.number.int({ min: 0, max: 10 }),
     fecha: faker.word.noun(10),
   
     estudiante: estudiante,
     actividad: actividad,
   }

  
   expect(serviceReseña.agregarReseña(reseña)).resolves.toThrow();
   
 });

 it('Find by id should return okey', async () => {

  const idKnown = faker.string.uuid()

   const actividad: ActividadEntity = {
     id: faker.string.uuid(),
     titulo: faker.lorem.sentence(20),
     fecha: faker.word.noun(),
     cupoMaximo: faker.number.int({ min: 5, max: 50 }),
      estado: 0,
     inscritos: [],
     reseñas: []
   }

   const estudiante: EstudianteEntity = {
     id:  faker.string.uuid() ,
     nombre: faker.word.noun(),
     numeroCedula: faker.number.int({ min: 100000, max: 100000 }),
     correo: faker.internet.email(),
     programa: faker.word.noun(),
     semestre: faker.number.int({ min: 1, max: 10 }),
     actividades: [],
     reseñas: []
   }
    const newEstudiante: EstudianteEntity = await serviceEstudiante.create(estudiante)
    const newActividad: ActividadEntity = await serviceActividad.create(actividad)
    serviceEstudiante.InscribirseActividad(newEstudiante.id,actividad.id)


   const reseña: ReseñaEntity = {
     id:  idKnown ,
     comentario: faker.lorem.paragraph(),
     calificacion: faker.number.int({ min: 0, max: 10 }),
     fecha: faker.word.noun(10),
   
     estudiante: estudiante,
     actividad: actividad,
   }

   expect((await serviceReseña.findReseñaById(idKnown)).comentario).toEqual(reseña.comentario);
   
 });

  it('Find by id should Not be okey -ID not found', async () => {

   var idKnown = faker.string.uuid()

   const actividad: ActividadEntity = {
     id: faker.string.uuid(),
     titulo: faker.lorem.sentence(20),
     fecha: faker.word.noun(),
     cupoMaximo: faker.number.int({ min: 5, max: 50 }),
      estado: 0,
     inscritos: [],
     reseñas: []
   }

   const estudiante: EstudianteEntity = {
     id:  faker.string.uuid() ,
     nombre: faker.word.noun(),
     numeroCedula: faker.number.int({ min: 100000, max: 100000 }),
     correo: faker.internet.email(),
     programa: faker.word.noun(),
     semestre: faker.number.int({ min: 1, max: 10 }),
     actividades: [],
     reseñas: []
   }
    const newEstudiante: EstudianteEntity = await serviceEstudiante.create(estudiante)
    const newActividad: ActividadEntity = await serviceActividad.create(actividad)
    serviceEstudiante.InscribirseActividad(newEstudiante.id,actividad.id)


   const reseña: ReseñaEntity = {
     id:  idKnown ,
     comentario: faker.lorem.paragraph(),
     calificacion: faker.number.int({ min: 0, max: 10 }),
     fecha: faker.word.noun(10),
   
     estudiante: estudiante,
     actividad: actividad,
   }
   idKnown+="23425";

   expect((await serviceReseña.findReseñaById(idKnown))).resolves.toThrow();
   
 });

});

