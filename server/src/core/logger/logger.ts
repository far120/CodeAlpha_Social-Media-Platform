import winston from 'winston';
import path from 'path';
import fs from 'fs';

const LOGS_DIR = path.join(process.cwd(), 'logs');

// إنشاء مجلد logs إذا لم يكن موجوداً
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

// تحديد ألوان الـ Logs في الـ Terminal
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// تنسيق الـ Logs المخصص للـ Terminal أثناء التطوير (Development)
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `[${info.timestamp}] [${info.level}]: ${info.message}${info.stack ? `\n${info.stack}` : ''}`
  )
);

// تنسيق الـ Logs للتخزين في الملفات (JSON أو نصي منظم)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// إعداد Winston Logger
export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: fileFormat,
  transports: [
    // 1. التخزين في الـ Console (Terminal)
    new winston.transports.Console({
      format: consoleFormat,
    }),
    // 2. تخزين كل الـ Logs في logs/app.log
    new winston.transports.File({
      filename: path.join(LOGS_DIR, 'app.log'),
      level: 'info',
    }),
    // 3. تخزين الأخطاء فقط في logs/error.log
    new winston.transports.File({
      filename: path.join(LOGS_DIR, 'error.log'),
      level: 'error',
    }),
  ],
});

export default logger;
