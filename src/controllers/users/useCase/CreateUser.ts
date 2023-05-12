import { User } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { createUserDTO } from "./../dtos/CreateUserDTO";

export class CreateUser {
  async execute({ name, email }: createUserDTO): Promise<User> {
    //Verificar usuario existente
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      //error
    }

    //Criacao de usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return user;
  }
}
