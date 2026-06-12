import { Express, Request, Response } from "express";
import { loginUser, registerUser } from "../../services/auth.services";
import { asyncHandler } from "../../utils/asyncHandler";
import { loginSchema, registerSchema } from "../../validators/auth.schema";

export function authRoutes(app: Express) {
  app.post(
    "/auth/register",
    asyncHandler(async (req: Request, res: Response) => {
      const data = registerSchema.parse(req.body);
      const result = await registerUser(data);
      res.status(201).json(result);
    })
  );

  app.post(
    "/auth/login",
    asyncHandler(async (req: Request, res: Response) => {
      const data = loginSchema.parse(req.body);
      const result = await loginUser(data.email, data.password);
      res.status(200).json(result);
    })
  );
}
