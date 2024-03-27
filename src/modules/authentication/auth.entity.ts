import { UserSchema } from "../user/user.entity";

export interface AuthSchema {
  email: UserSchema["email"];
}
