import { IUser } from "../models/IUser";

export interface IUserService {
  createUser(email: string, password: string): Promise<IUser>;
  getUserById(userId: string): Promise<IUser | null>;
}
