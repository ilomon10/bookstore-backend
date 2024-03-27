import { Router } from "express";
import OrderRepository from "./order.repository";
import OrderService from "./order.service";
import OrderController from "./order.controller";
import { Knex } from "knex";

const router = Router();

const orderRouter = (knex: Knex) => {
  const orderRepository = new OrderRepository(knex);
  const orderService = new OrderService(orderRepository);
  const orderController = new OrderController(orderService);

  router.post("/", orderController.create);
  router.get("/:id", orderController.getOne);
  router.get("/", orderController.getMany);

  return router;
};

export default orderRouter;
