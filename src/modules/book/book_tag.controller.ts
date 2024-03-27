import { Request, Response } from "express";
import { BookTagService } from "./book_tag.service";
import { IQueryFilter } from "../types";

export class BookTagController {
  private tagService: BookTagService;

  constructor(tagService: BookTagService) {
    this.tagService = tagService;
  }

  create = async (req: Request, res: Response) => {
    try {
      const tag = req.body;
      const createdTag = this.tagService.create(tag);
      res.status(201).json(createdTag);
    } catch (error) {
      console.error("Error creating tag:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const tag = this.tagService.getOne(id);
      if (!tag) {
        res.status(404).json({ message: "Tag not found" });
      } else {
        res.status(200).json(tag);
      }
      res.status(200).json(tag);
    } catch (error) {
      console.error("Error creating tag:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  getMany = async (req: Request, res: Response): Promise<void> => {
    try {
      const filter: IQueryFilter = req.query;
      const tags = await this.tagService.getMany(filter);
      res.status(200).json(tags);
    } catch (error) {
      console.error("Error getting all tags:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  assignTagToBook = async(): Promise<void> => {

  }
}
