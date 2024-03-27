import { UserSchema } from "../user/user.entity";
import { AuthSchema } from "./auth.entity";
import { AuthRepository } from "./auth.repository";

export class AuthService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  login = async (auth: AuthSchema) => {
    const user = await this.authRepository.authenticate(auth);
    return user;
  };
}
