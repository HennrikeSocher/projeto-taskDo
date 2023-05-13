import express, { Request, Response } from "express";
import { UserController } from "../controllers/users/useCase/UserControllers";

const userController = new UserController();

const router = express.Router();

router.post("/users", async (req: Request, res: Response) => {
  await userController.createUser(req, res);
});

router.get("/users/:id", async (req: Request, res: Response) => {
  await userController.getUserById(req, res);
});

router.put("/users/:id", async (req: Request, res: Response) => {
  await userController.updateUser(req, res);
});

router.delete("/users/:id", async (req: Request, res: Response) => {
  await userController.deleteUser(req, res);
});

router.get("/users", async (req: Request, res: Response) => {
  await userController.getAllUsers(req, res);
});

export { router };
