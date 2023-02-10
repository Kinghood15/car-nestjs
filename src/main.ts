import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,{
    transport: Transport.NATS,
    option:{
      url:'nats://localhost:4222',
    },
  } as MicroserviceOptions);
  (app as any).set('etag', false);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(()=> console.log("Microservice is listening ... "));
}
bootstrap();
