import { Router } from "express";
import { BookRepository } from "./book.repository";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { Knex } from "knex";

const router = Router();

const bookRouter = (knex: Knex) => {
  const bookRepository = new BookRepository(knex);
  const bookService = new BookService(bookRepository);
  const bookController = new BookController(bookService);

  router.post("/", bookController.create);
  router.get("/:id", bookController.getOne);
  router.get("/", bookController.getMany);

  return router;
};

export default bookRouter;
