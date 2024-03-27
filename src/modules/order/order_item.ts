import { Router } from "express";
import { Knex } from "knex";
import { OrderItemRepository } from "./order_item.repository";
import { OrderItemService } from "./order_item.service";
import { OrderItemController } from "./order_item.controller";

const router = Router();

const orderItemRouter = (knex: Knex) => {
  const orderItemRepository = new OrderItemRepository(knex);
  const orderItemService = new OrderItemService(orderItemRepository);
  const orderItemController = new OrderItemController(orderItemService);

  router.post("/", orderItemController.create);
  router.get("/:id", orderItemController.getOne);
  router.get("/", orderItemController.getMany);

  return router;
};

export default orderItemRouter;
