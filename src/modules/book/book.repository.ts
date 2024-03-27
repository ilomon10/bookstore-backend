import { Knex } from "knex";
import { BookSchema } from "./book.entity";
import { GetManyResponse, IQueryFilter, IQueryPagination } from "../types";

export class BookRepository {
  constructor(private readonly knex: Knex) {}

  async create(book: BookSchema): Promise<BookSchema> {
    return this.knex("books").insert(book).returning("*").first();
  }

  async getOne(id: BookSchema["id"]): Promise<BookSchema | undefined> {
    return this.knex("books").where("id", id).first();
  }

  async getMany(
    filter: IQueryFilter,
    pagination: IQueryPagination
  ): Promise<GetManyResponse<BookSchema>> {
    const builder = this.knex("books").where(filter);
    const countBuilder = builder.clone().count(`books.id as total`);

    if (pagination.$limit) {
      builder.limit(pagination.$limit);
    }

    if (pagination.$skip) {
      builder.offset(pagination.$skip);
    }

    const data =
      pagination.$limit === 0
        ? []
        : await builder.catch((error) => {
            throw new Error("Error while getting books");
          });

    const total = await countBuilder.then((count) => {
      return parseInt((count[0] ? count[0].total : 0) as any);
    });

    return {
      total,
      limit: pagination.$limit,
      skip: pagination.$skip,
      data,
    };
  }
}
