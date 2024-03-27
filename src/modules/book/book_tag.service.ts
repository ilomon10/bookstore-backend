import { IQueryFilter } from "../types";
import { BookTagSchema } from "./book_tag.entity";
import { BookTagRepository } from "./book_tag.repository";

export class BookTagService {
  private repository: BookTagRepository;

  constructor(repository: BookTagRepository) {
    this.repository = repository;
  }

  create = async (tag: any): Promise<BookTagSchema> => {
    return this.repository.create(tag);
  };

  getOne = async (id: string): Promise<BookTagSchema[]> => {
    return this.repository.getOne(id);
  };
  getMany = async (filter: IQueryFilter): Promise<BookTagSchema[]> => {
    return this.repository.getMany(filter);
  };
}
