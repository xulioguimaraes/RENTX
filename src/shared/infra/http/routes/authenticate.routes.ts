import { RefreshTokenController } from "@modules/accounts/useCase/refreshToken/RefreshTokenController";
import { Router } from "express";
import { AuthenticateUserController } from "../../../../modules/accounts/useCase/authenticateUser/authenticateUserController";

const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
