import { Request, Response } from "express";
import { IUserController } from "@interfaces/controllers/IUserController";
import { UserService } from "@services/user.service";

export class UserController implements IUserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const newUser = await this.userService.createUser(email, password);
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  public getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const user = await this.userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
