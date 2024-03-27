import { Knex } from "knex";
import { UserSchema } from "./user.entity";
import { GetManyResponse, IQueryFilter, IQueryPagination } from "../types";

class UserRepository {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  create = async (user: UserSchema): Promise<UserSchema> => {
    const [createdBook] = await this.knex("users").insert(user).returning("*");
    return createdBook;
  };

  getOne = async (id: string): Promise<UserSchema | undefined> => {
    return this.knex("users").where("id", id).first();
  };

  getMany = async (
    filter: IQueryFilter,
    pagination: IQueryPagination
  ): Promise<GetManyResponse<UserSchema>> => {
    const builder = this.knex("users").where(filter);
    const countBuilder = builder.clone().count(`users.id as total`);

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
            throw new Error("Error while getting users");
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
  };
}

export default UserRepository;
