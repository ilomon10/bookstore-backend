import { Router } from "express";
import { Knex } from "knex";
import { BookTagRepository } from "./book_tag.repository";
import { BookTagService } from "./book_tag.service";
import { BookTagController } from "./book_tag.controller";

const router = Router();

const bookTagRouter = (knex: Knex) => {
  const tagRepository = new BookTagRepository(knex);
  const tagService = new BookTagService(tagRepository);
  const tagController = new BookTagController(tagService);

  router.post("/", tagController.create);
  router.get("/:id", tagController.getOne);
  router.get("/", tagController.getMany);

  return router;
};

export default bookTagRouter;
