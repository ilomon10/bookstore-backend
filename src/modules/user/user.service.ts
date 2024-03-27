import { defaultPagination } from "../book/book.service";
import { IQueryFilter } from "../types";
import UserRepository from "./user.repository";
import _omit from "lodash/omit";
import _pick from "lodash/pick";

class UserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  create(user: any) {
    // Add any business logic here if needed
    return this.repository.create(user);
  }

  getOne(id: string) {
    return this.repository.getOne(id);
  }

  getMany(filter: IQueryFilter) {
    return this.repository.getMany(
      _omit(filter, ["$limit", "$skip", "$total"]),
      _pick(filter, ["$limit", "$skip", "$total"]) || defaultPagination
    );
  }
}

export default UserService;
