import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          field: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
          // message: errors.reduce(
          //   (acc, e) => ({
          //     ...acc,
          //     [e.property]: Object.values(e.constraints),
          //   }),
          //   {},
          // ),
        }));
        // console.log({ result })
        return new UnprocessableEntityException({ errors: result });
      },
      stopAtFirstError: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
