import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { config } from 'dotenv'

import {
  SWAGGER_API_CURRENT_VERSION,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_NAME,
  SWAGGER_API_ROOT,
} from './common/constants'
import { Logger } from './common/utils/logger'

config({
  path: '.env',
})

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  })

  const configService = app.get(ConfigService)

  // swagger
  if (configService.get('NODE_ENV') !== 'production') {
    createSwagger(app)
  }

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
  app.use(helmet.hidePoweredBy())
  app.use(helmet())
  app.setGlobalPrefix(configService.get('PATH_SUBDOMAIN') || 'api')
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const port = configService.get('PORT')
  await app.listen(port)

  Logger.info({
    env: String(process.env.NODE_ENV),
    port: port,
  })
}

function createSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addServer(`http://localhost:${process.env.PORT}/api/`)
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document)
}

bootstrap()
