import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(BigInt.prototype as any).toJSON = function() {
  return this.toString()
} 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
