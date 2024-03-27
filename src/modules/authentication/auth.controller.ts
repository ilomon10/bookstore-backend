import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login = async (req: Request, res: Response) => {
    try {
      const auth = req.body;
      const user = await this.authService.login(auth);
      if (!user) {
        res.status(400).json({ message: "User not authenticate" });
      }
      res.status(201).json(user);
    } catch (error) {
      console.error("Error while login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
