import { Task } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { CreateTaskDTO } from "../dtos/CreateTaskDTO";
import { UpdateTaskDTO } from "../dtos/UpdateTaskDTO";
import { AppError } from "../../../errors/AppError";

export class TaskService {
  async createTask(data: CreateTaskDTO): Promise<Task> {
    const { title, description, user_id, completed } = data;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        user_id, 
        completed,
      },
    });

    return task;
  }

  async getTaskById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new AppError("Tarefa não encontrada");
    }

    return task;
  }

  async updateTask(id: string, data: UpdateTaskDTO): Promise<Task> {
    const { title, description, completed} = data;

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        completed,
      },
    });

    if (!task) {
      throw new AppError("Tarefa não encontrada");
    }

    return task;
  }

  async deleteTask(id: string): Promise<Task> {
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    if (!task) {
      throw new AppError("Tarefa não encontrada");
    }

    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    const tasks = await prisma.task.findMany();

    return tasks;
  }
}
