import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS para permitir el origen del frontend
  app.enableCors({
    origin: 'http://localhost:5173', // Asegúrate de usar el puerto correcto de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Si necesitas enviar cookies u otros encabezados de autenticación
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
