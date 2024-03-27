import { Knex } from "knex";
import { BookTagSchema } from "./book_tag.entity";
import { IQueryFilter } from "../types";

export class BookTagRepository {
  private knex: Knex;
  constructor(knex: Knex) {
    this.knex = knex;
  }

  create = async (data: BookTagSchema): Promise<BookTagSchema> => {
    const [createdTag] = await this.knex("book_tags").insert(data).returning("*");
    return createdTag;
  };

  getOne = async (id: string): Promise<BookTagSchema[]> => {
    return this.knex("book_tags").where("id", id).first();
  };

  getMany = async (filter: IQueryFilter): Promise<BookTagSchema[]> => {
    return this.knex("book_tags").where(filter);
  };
}
