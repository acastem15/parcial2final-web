import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
 const app = await NestFactory.create(AppModule);
 app.enableVersioning({
   type: VersioningType.URI,
   prefix: 'api/v', //Esto indica que en la ruta me voy a /api/v + version(1)
   defaultVersion: '1',
 });
 app.useGlobalPipes(new ValidationPipe());

 await app.listen(3000);
}
bootstrap();

