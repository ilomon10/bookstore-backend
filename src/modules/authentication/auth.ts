import { Router } from "express";
import { Knex } from "knex";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

const router = Router();

const authRouter = (knex: Knex) => {
  const authRepository = new AuthRepository(knex);
  const authService = new AuthService(authRepository);
  const authController = new AuthController(authService);

  router.post("/login", authController.login);
  return router;
};

export default authRouter;
