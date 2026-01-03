import app from './app';
import { connectDatabase } from './config/database';
import { config } from './config/config';

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Start Express server
    app.listen(config.server.port, () => {
      console.log(`
        ╔═══════════════════════════════════════════╗
        ║   🎯 Human Resource Management System     ║
        ║   📍 Port: ${config.server.port}                      ║
        ║   📚 Docs: http://localhost:${config.server.port}/api-docs ║
        ║   ✅ Status: Ready to accept requests    ║
        ╚═══════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
