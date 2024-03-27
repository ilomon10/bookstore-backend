import { Request, Response } from "express";
import { BookService } from "./book.service";
import { BookSchema } from "./book.entity";

export class BookController {
  private service: BookService;
  constructor(service: BookService) {
    this.service = service;
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const book: BookSchema = req.body;
      const createdBook = await this.service.create(book);
      res.status(201).json(createdBook);
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const id: BookSchema["id"] = req.params.id;
      const book = await this.service.getOne(id);
      if (!book) {
        res.status(404).json({ message: "Book not found" });
      } else {
        res.status(200).json(book);
      }
    } catch (error) {
      console.error("Error getting book by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getMany = async (req: Request, res: Response): Promise<void> => {
    try {
      const filter = req.query;
      const books = await this.service.getMany(filter);
      res.status(200).json(books);
    } catch (error) {
      console.error("Error getting many books:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
