import prisma from "../config/database";
import { IUserService } from "@interfaces/services/IUserService";
import { IUser } from "@interfaces/models/IUser";
import * as bcrypt from "bcrypt";

export class UserService implements IUserService {
  public async createUser(email: string, password: string): Promise<IUser> {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return user;
  }

  public async getUserById(userId: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  }
}
