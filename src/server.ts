import dotenv from "dotenv";
import app from "./app";
import { prisma } from "./config/database";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database
    await prisma.$connect();

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║   🌟 Khzenti Backend Server 🌟      ║
║                                       ║
║   Environment: ${process.env.NODE_ENV || "development"}              ║
║   Port: ${PORT}                          ║
║   API: http://localhost:${PORT}/api/v1   ║
║                                       ║
╚═══════════════════════════════════════╝
      `);
    });

    // Graceful shutdown
    const gracefulShutdown = async () => {
      console.log("\n🔄 Shutting down gracefully...");

      server.close(async () => {
        await prisma.$disconnect();
        console.log("✅ Server closed");
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.error("⚠️  Forced shutdown");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
