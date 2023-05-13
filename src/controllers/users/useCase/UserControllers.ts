import { Request, Response } from "express";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UserService } from "./UserService";
import { AppError } from "../../../errors/AppError";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response) {
    try {
      const { name, email }: CreateUserDTO = req.body;
      const user = await this.userService.createUser({ name, email });
      return res.status(201).json({ Message: "Usuario Criado com sucesso", user});
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(String(id));
      if (!user) {
        throw new AppError("User not found");
      }
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email }: CreateUserDTO = req.body;
      const updatedUser = await this.userService.updateUser(String(id), { name, email });
      return res.status(200).json({message: "Usuario atualizado", updatedUser})
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(String(id));
      return res.status(200).json({ message: "Usuario deletado" });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json({message: "Lista de todos os usuarios", users});
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
