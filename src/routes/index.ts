import express, { Request, Response } from 'express';
import { UserController } from "../controllers/users/useCase/UserControllers";
import { TaskController } from "../controllers/tasks/useCase/taskControllers";



const userController = new UserController();
const taskController = new TaskController();

const router = express.Router();

router.post('/users', async (req: Request, res: Response) => {
  await userController.createUser(req, res);
});

router.get('/users/:id', async (req: Request, res: Response) => {
  await userController.getUserById(req, res);
});

router.put('/users/:id', async (req: Request, res: Response) => {
  await userController.updateUser(req, res);
});

router.delete('/users/:id', async (req: Request, res: Response) => {
  await userController.deleteUser(req, res);
});

router.get('/users', async (req: Request, res: Response) => {
  await userController.getAllUsers(req, res);
});

router.post('/tasks', async (req: Request, res: Response) => {
  await taskController.createTask(req, res);
});

router.get('/tasks/:id', async (req: Request, res: Response) => {
  await taskController.getTaskById(req, res);
});

router.put('/tasks/:id', async (req: Request, res: Response) => {
  await taskController.updateTask(req, res);
});

router.delete('/tasks/:id', async (req: Request, res: Response) => {
  await taskController.deleteTask(req, res);
});

router.get('/tasks', async (req: Request, res: Response) => {
  await taskController.getAllTasks(req, res);
});

export { router };