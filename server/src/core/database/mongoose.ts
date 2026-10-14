import mongoose from 'mongoose';
import logger from '../logger/logger';

export default async function connectDatabase(): Promise<void> {
  try {
    const mongoUri = process.env.MONGODB_URI ;
    if(!mongoUri){
      throw new Error('❌MONGODB_URI is not defined');
    }
    const conn = await mongoose.connect(mongoUri);
    logger.info(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error('❌ Database Connection Error:', error);
    process.exit(1);
  }
};

