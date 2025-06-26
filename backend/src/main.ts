import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { SensisitveDataInterceptor } from './interceptors/sensitive-data.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomPrismaClientExceptionFilter } from './exception-filters/prisma-client.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validateCustomDecorators: true,
      forbidUnknownValues: true,
    }),
  );
  app.useGlobalInterceptors(new SensisitveDataInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Rhunner API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CustomPrismaClientExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
