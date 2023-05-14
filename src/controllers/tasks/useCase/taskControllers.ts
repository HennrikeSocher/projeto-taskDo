import { Request, Response } from "express";
import { CreateTaskDTO } from "../dtos/CreateTaskDTO";
import { TaskService } from "./TaskService";
import { AppError } from "../../../errors/AppError";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async createTask(req: Request, res: Response) {
    try {
      const { title, description, completed, user_id }: CreateTaskDTO = req.body;
      const task = await this.taskService.createTask({ title, description, completed, user_id });
      return res.status(201).json({ message: "Tarefa criada com sucesso", task });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const task = await this.taskService.getTaskById(String(id));
      if (!task) {
        throw new AppError("Tarefa não encontrada");
      }
      return res.status(200).json(task);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, completed, user_id }: CreateTaskDTO = req.body;
      const updatedTask = await this.taskService.updateTask(String(id), { title, description, user_id, completed });
      return res.status(200).json({ message: "Tarefa atualizada", updatedTask });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.taskService.deleteTask(String(id));
      return res.status(200).json({ message: "Tarefa deletada" });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await this.taskService.getAllTasks();
      return res.status(200).json({ message: "Lista de todas as tarefas", tasks });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}