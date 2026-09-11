import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true
  }))

  const config = new DocumentBuilder()
    .setTitle('API Servicios solicitudes TI')
    .setDescription('CRUD + búsqueda compatible con frontend Vue')
    .setVersion('1.0')
    .build()
  const doc = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api', app, doc)

  await app.listen(3000)
  console.log('API en http://localhost:3000')
  console.log('Swagger en http://localhost:3000/api')
}
bootstrap()
