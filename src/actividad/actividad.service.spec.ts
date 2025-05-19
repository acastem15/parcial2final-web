import { Test, TestingModule } from '@nestjs/testing';
import { ActividadService } from './actividad.service';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ActividadEntity } from './actividad.entity/actividad.entity';
import { faker } from '@faker-js/faker';
import { EstudianteService } from '../estudiante/estudiante.service';
import { EstudianteEntity } from '../estudiante/estudiante.entity/estudiante.entity';

describe('ActividadService', () => {
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
 

 it('create should return a new actividad', async () => {
   const actividad: ActividadEntity = {
     id: faker.string.uuid(),
     titulo: faker.lorem.word(20),
     fecha: faker.word.noun(),
     cupoMaximo: faker.number.int({ min: 5, max: 50 }),
      estado: 0,
     inscritos: [],
     reseñas: []
   }
   expect(await serviceActividad.create(actividad)).resolves.not.toThrow();
   const newActividad: ActividadEntity = await serviceActividad.create(actividad);
   expect(newActividad).not.toBeNull();
   
 });

  it('create should not return a new actividad - Fallo titulo', async () => {
   const actividad: ActividadEntity = {
     id: faker.string.uuid(),
     titulo: faker.lorem.word(3),
     fecha: faker.word.noun(),
     cupoMaximo: faker.number.int({ min: 5, max: 50 }),
      estado: 1,
     inscritos: [],
     reseñas: []
   }
   expect(await serviceActividad.create(actividad)).resolves.toThrow();
   const newActividad: ActividadEntity = await serviceActividad.create(actividad);
   expect(newActividad).not.toBeNull();
   
 });

it('cambiar estado correcto', async () => {
   const actividad: ActividadEntity = {
     id: faker.string.uuid(),
     titulo: faker.lorem.word(20),
     fecha: faker.word.noun(),
     cupoMaximo: faker.number.int({ min: 5, max: 50 }),
      estado: 0,
     inscritos: [],
     reseñas: []
   }
   expect(await serviceActividad.create(actividad)).resolves.not.toThrow();
   const newActividad: ActividadEntity = await serviceActividad.cambiarEstado(actividad.id,2)
   expect(newActividad).not.toBeNull();
   
 });

 it('cambiar estado incorrecto - No cumple precondition', async () => {
   const actividad: ActividadEntity = {
     id: faker.string.uuid(),
     titulo: faker.lorem.word(20),
     fecha: faker.word.noun(),
     cupoMaximo: 10,
      estado: 0,
     inscritos: [],
     reseñas: []
   }

   for(let i = 0; i < 10; i++){
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
      actividad.inscritos.push(estudiante);
    }


   const newActividad: ActividadEntity = await serviceActividad.create(actividad);
    expect(await serviceActividad.cambiarEstado(actividad.id,2)).resolves.toThrow();

  const actividadCambioEstado: ActividadEntity = await serviceActividad.cambiarEstado(actividad.id,2)
   expect(newActividad).toBeNull();
   
 });

 it('Find by fecha OKEY', async () => {

  const fecha = "15/07/2025"

   const actividad: ActividadEntity = {
     id: faker.string.uuid(),
     titulo: faker.lorem.word(20),
     fecha: fecha,
     cupoMaximo: 10,
      estado: 0,
     inscritos: [],
     reseñas: []
   }

   const newActividad: ActividadEntity = await serviceActividad.create(actividad);

   

    expect(await serviceActividad.findAllActividadesByDate(fecha)).resolves.not.toThrow();
    const actividadesFecha: ActividadEntity[] = await serviceActividad.findAllActividadesByDate(fecha);

   expect(await serviceActividad.findAllActividadesByDate(fecha)).not.toBeNull();

   expect(actividadesFecha.at(0)?.id ).toEqual(actividad.id); 
   
 });


it('Find by fecha fallido -Not found', async () => {

  const fecha = "15/07/2025"

   const actividad: ActividadEntity = {
     id: faker.string.uuid(),
     titulo: faker.lorem.word(20),
     fecha: fecha,
     cupoMaximo: 10,
      estado: 0,
     inscritos: [],
     reseñas: []
   }

   const newActividad: ActividadEntity = await serviceActividad.create(actividad);
   

   

  expect(await serviceActividad.findAllActividadesByDate("13/07/2025")).resolves.toThrow();
  expect(await serviceActividad.findAllActividadesByDate("13/07/2025")).toBeNull();

   
 });




});