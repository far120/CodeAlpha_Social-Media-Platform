import app from './app';
import dotenv from 'dotenv'

dotenv.config()

export const startServer = () => {
  const PORT = process.env.PORT || 5000;

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });

  // Graceful Shutdown handling...
  return server;
};
