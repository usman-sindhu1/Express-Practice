import "dotenv/config";
import express from "express";
import { authRoutes } from "./handlers/auth/auth.routes";
import { userRoutes } from "./handlers/users/user.routes";
import { connectDatabase } from "./lib/prisma";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();
const PORT = process.env.PORT_NO || 3000;

app.use(express.json());

authRoutes(app);
userRoutes(app);

app.use(errorMiddleware);

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });
