import { Request, Response } from "express";

export interface IUserController {
  createUser(req: Request, res: Response): Promise<void>;
  getUserProfile(req: Request, res: Response): Promise<void>;
}
