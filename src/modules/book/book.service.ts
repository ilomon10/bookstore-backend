import { IQueryFilter, IQueryPagination } from "../types";
import { BookSchema } from "./book.entity";
import { BookRepository } from "./book.repository";
import _omit from "lodash/omit";
import _pick from "lodash/pick";

export const defaultPagination = {
  $limit: 10,
  $skip: 0,
  $total: 0,
};

export class BookService {
  constructor(private readonly repository: BookRepository) {}

  create = async (book: BookSchema): Promise<BookSchema> => {
    return this.repository.create(book);
  };

  getOne = async (id: BookSchema["id"]): Promise<BookSchema | undefined> => {
    return this.repository.getOne(id);
  };

  getMany = async (filter: IQueryFilter) => {
    return this.repository.getMany(
      _omit(filter, ["$limit", "$skip", "$total"]),
      _pick(filter, ["$limit", "$skip", "$total"]) || defaultPagination
    );
  };
}
