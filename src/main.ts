import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const bodyParser = require('body-parser');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()

  app.use(bodyParser.json())

  const config = new DocumentBuilder()
    .setTitle('Balrog Account System')
    .setDescription('Desc for Balrog API\'s')
    .setVersion('1.0')
    .addTag('balrog')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
