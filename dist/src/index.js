"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("./handlers/auth/auth.routes");
const user_routes_1 = require("./handlers/users/user.routes");
const prisma_1 = require("./lib/prisma");
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
const PORT = process.env.PORT_NO || 3000;
app.use(express_1.default.json());
(0, auth_routes_1.authRoutes)(app);
(0, user_routes_1.userRoutes)(app);
app.use(error_middleware_1.errorMiddleware);
(0, prisma_1.connectDatabase)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
});
