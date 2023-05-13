import { User } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { AppError } from "../../../errors/AppError";

export class UserService {
  async createUser(data: CreateUserDTO): Promise<User> {
    const { name, email } = data;

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("Usuario com email ja existente");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("Usuario nao encontrado");
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    const { name, email } = data;

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });

    if (!user) {
      throw new AppError("Usuario nao encontrado");
    }

    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("Usuario nao encontrado");
    }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }
}
