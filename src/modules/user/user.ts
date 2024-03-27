import { Router } from "express";
import UserController from "./user.controller";
import UserRepository from "./user.repository";
import UserService from "./user.service";
import { Knex } from "knex";

const router = Router();

const userRouter = (knex: Knex) => {
  const userRepository = new UserRepository(knex);
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  router.post("/", userController.create);
  router.get("/:id", userController.getOne);
  router.get("/", userController.getMany);
  return router;
};

export default userRouter;
