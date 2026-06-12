import { Express, Request, Response } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { getUser, updateUser } from "../../services/user.services";
import { asyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../utils/errors";
import { updateUserSchema } from "../../validators/user.schema";

export function userRoutes(app: Express) {
  app.get(
    "/users/me",
    authMiddleware,
    asyncHandler(async (req: Request, res: Response) => {
      const user = await getUser(req.userId!);

      if (!user) {
        throw new AppError(404, "User not found");
      }

      res.status(200).json(user);
    })
  );

  app.patch(
    "/users/me",
    authMiddleware,
    asyncHandler(async (req: Request, res: Response) => {
      const data = updateUserSchema.parse(req.body);
      const user = await updateUser(req.userId!, data);
      res.status(200).json(user);
    })
  );
}
