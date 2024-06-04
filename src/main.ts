import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import helmet from 'helmet';
import * as compression from 'compression';
import * as basicAuth from 'express-basic-auth';

import { AppModule } from '@/app/app.module';
import { GlobalExceptionFilter } from '@/filters';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;

  /**
   * Global configuration
   */
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(compression());
  app.enableCors({
    origin: '*',
  });
  app.use(helmet({ contentSecurityPolicy: false }));

  /**
   * Global filters
   */
  app.useGlobalFilters(new GlobalExceptionFilter());

  /**
   * Require login to view api documentation in production env
   */
  app.use(
    ['/docs'],
    basicAuth({
      challenge: true,
      users: {
        admin: 'admin',
      },
    }),
  );

  /**
   * Swagger configuration
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Automatically generated API documentation')
    .setVersion('1.0')
    .setExternalDoc('Export API documentation as json file', '/api/download')
    .addTag('Auth API', 'Auth account management')
    .addTag('Accounts API', 'Accounts management')
    .addTag('Bus API', 'Manage bus unit details')
    .addTag('Bus Staffs API', 'Manage drivers/conductors to be assigned per bus unit')
    .addTag('Bus Routes API', 'Manage available bus routes to buy/book tickets from')
    .addTag('Bus Ticket Payments API', 'Manage and view bus ticket payments')

    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs/api', app, swaggerDocument, {
    customSiteTitle: 'Server Swagger API Documentation',
  });

  await app.listen(port);
}

bootstrap();
