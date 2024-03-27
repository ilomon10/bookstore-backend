import { Request, Response } from "express";
import UserService from "./user.service";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  create = (req: Request, res: Response) => {
    const user = req.body;
    const createdUser = this.userService.create(user);
    res.status(201).json(createdUser);
  };

  getOne = (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = this.userService.getOne(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  };

  getMany = (req: Request, res: Response) => {
    const filter = req.query;
    const users = this.userService.getMany(filter);
    res.status(200).json(users);
  };
}

export default UserController;
