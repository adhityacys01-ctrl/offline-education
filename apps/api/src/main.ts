import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Global API prefix
  app.setGlobalPrefix(process.env.API_PREFIX ?? 'api/v1')

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  // CORS
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    process.env.CORS_ORIGIN,
  ].filter(Boolean) as string[]

  app.enableCors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(null, true) // permissive for local dev
    },
    credentials: true,
  })

  // Swagger docs (dev only)
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Offline Learning Platform API')
      .setDescription('API for the Offline Learning Platform — Learn Anytime, Anywhere.')
      .setVersion('1.0')
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)
  }

  const port = parseInt(process.env.PORT ?? '3001', 10)
  await app.listen(port)
  console.log(`\n🚀 API running at http://localhost:${port}/api/v1`)
  console.log(`📚 Swagger docs at http://localhost:${port}/docs\n`)
}

bootstrap()
