import { Knex } from "knex";
import { AuthSchema } from "./auth.entity";
import { UserSchema } from "../user/user.entity";

export class AuthRepository {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  authenticate = async (auth: AuthSchema): Promise<UserSchema> => {
    const user = await this.knex("users").where("email", auth.email).first();
    return user;
  };
}
