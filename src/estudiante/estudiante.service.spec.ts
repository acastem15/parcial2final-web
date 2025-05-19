import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { min } from 'class-validator';
import { ActividadService } from '../actividad/actividad.service';
import { ActividadEntity } from '../actividad/actividad.entity/actividad.entity';

describe('EstudianteService', () => {
  let serviceEstudiante: EstudianteService;
 let repositoryEstudiante: Repository<EstudianteEntity>;
 let serviceActividad: ActividadService;
  let repositoryActividad: Repository<ActividadEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [EstudianteService,ActividadService],
   }).compile();

   serviceEstudiante = module.get<EstudianteService>(EstudianteService);
   repositoryEstudiante = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    serviceActividad = module.get<ActividadService>(ActividadService);
    repositoryActividad = module.get<Repository<ActividadEntity>>(getRepositoryToken(ActividadEntity));
 });
  
 it('should be defined', () => {
   expect(serviceEstudiante).toBeDefined();
   expect(serviceActividad).toBeDefined();

  });

it('create should return a new estudiante', async () => {
  const actividad: ActividadEntity = {
       id: faker.string.uuid(),
       titulo: faker.word.noun(),
       fecha: faker.word.noun(),
       cupoMaximo: faker.number.int({ min: 5, max: 50 }),
        estado: 0,
       inscritos: [],
       reseñas: []
     }

   const estudiante: EstudianteEntity = {
     id: faker.string.uuid(),
     nombre: faker.word.noun(),
     numeroCedula: faker.number.int({ min: 100000, max: 100000 }),
     correo: faker.internet.email(),
     programa: faker.word.noun(),
     semestre: faker.number.int({ min: 1, max: 10 }),
     actividades: [],
     reseñas: []
   }
   expect(await serviceEstudiante.create(estudiante)).resolves.not.toThrow();
   const newEstudiante: EstudianteEntity = await serviceEstudiante.create(estudiante);
   expect(newEstudiante).not.toBeNull();
   
 });

 it('create should return an exception - Not email', async () => {
   const estudiante: EstudianteEntity = {
     id: faker.string.uuid(),
     nombre: faker.word.noun(),
     numeroCedula: faker.number.int({ min: 100000, max: 100000 }),
     correo: "thisIsnotEmail",
     programa: faker.word.noun(),
     semestre: faker.number.int({ min: 1, max: 10 }),
     actividades: [],
     reseñas: []
   }
   expect(await serviceEstudiante.create(estudiante)).resolves.toThrow();
   const newEstudiante: EstudianteEntity = await serviceEstudiante.create(estudiante);
   expect(newEstudiante).toBeNull();
   
 });

it('Find by id should return a estudiante', async () => {

  const idKnown = faker.string.uuid()
  console.log(idKnown)

   const estudiante: EstudianteEntity = {
     id:  idKnown ,
     nombre: faker.word.noun(),
     numeroCedula: faker.number.int({ min: 100000, max: 100000 }),
     correo: faker.internet.email(),
     programa: faker.word.noun(),
     semestre: faker.number.int({ min: 1, max: 10 }),
     actividades: [],
     reseñas: []
   }

   const newEstudiante: EstudianteEntity = await serviceEstudiante.create(estudiante)


   expect(serviceEstudiante.findEstudianteById(idKnown)).not.toBeNull();
   
 });

 it('Find by id should return null - No found', async () => {

  var idKnown = faker.string.uuid() 

   const estudiante: EstudianteEntity = {
     id:  idKnown ,
     nombre: faker.word.noun(),
     numeroCedula: faker.number.int({ min: 100000, max: 100000 }),
     correo: faker.internet.email(),
     programa: faker.word.noun(),
     semestre: faker.number.int({ min: 1, max: 10 }),
     actividades: [],
     reseñas: []
   }

   const newEstudiante: EstudianteEntity = await serviceEstudiante.create(estudiante)
   idKnown+=+ "34566"

   expect(serviceEstudiante.findEstudianteById(idKnown)).toBeNull();
   
 });





  it('Inscribirse a actividad satisfactorio', async () => {

  const actividad: ActividadEntity = {
     id: faker.string.uuid(),
     titulo: faker.word.noun(),
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


   expect(serviceEstudiante.InscribirseActividad(newEstudiante.id,newActividad.id)).not.toBeNull();
   
 });

 it('Inscribirse a actividad NO  - Previa inscripción', async () => {

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
   actividad.inscritos.push(newEstudiante)
   const newActividad: ActividadEntity = await serviceActividad.create(actividad)
   


   expect(serviceEstudiante.InscribirseActividad(newEstudiante.id,newActividad.id)).resolves.toThrow();
   expect(serviceEstudiante.InscribirseActividad(newEstudiante.id,newActividad.id)).toBeNull();
   
 });





});

