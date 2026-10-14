import { startServer } from './app/server';
import connectDatabase from './core/database/mongoose';

async function bootstrap() {
  await connectDatabase(); // 1. اتصل بالداتابيز الأول
  startServer();           // 2. شغّل السيرفر بعدها
}

bootstrap();
